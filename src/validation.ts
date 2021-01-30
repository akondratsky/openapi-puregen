import Joi, { Schema } from 'joi';
import { Configuration } from 'app/types';
import { forOwn, uniq } from 'lodash';

export const MESSAGES = {
  CONFIG: {
    UNKNOWN_FIELD: 'Configuration has only two fields on top level: commonVariables and renderables'
  },
  RENDERABLE: {
    REQUIRED: 'You should specify at least one renderable',
    OBJECT: 'Renderables should not be an array, but object'
  },
  PATH: {
    REQUIRED: 'You should specify JSON path for each renderable'
  },
  ITERATE: {
    REQUIRED: 'You should specify is renderable is iterable ("iterate" option)'
  },
  TEMPLATE: {
    REQUIRED: 'You should specify template for each renderable'
  },
  OUTPUT: {
    REQUIRED: 'You should specify template for output file name for each renderable'
  },
  VARIABLE: {
    PATH: {
      REQUIRED: 'You should specify path for all variables'
    }
  }
};

const defaultValidationOptions = {
  abortEarly: false
};

const configurationSchema = Joi.object({
  commonVariables: Joi.object()
    .optional(),
  renderables: Joi.object()
    .required()
    .messages({
      'any.required': MESSAGES.RENDERABLE.REQUIRED,
      'object.base': MESSAGES.RENDERABLE.OBJECT
    })
}).messages({
  'object.unknown': MESSAGES.CONFIG.UNKNOWN_FIELD
});

const renderablesListSchema = Joi.array()
  .items(Joi.string())
  .min(1)
  .messages({
    'array.min': MESSAGES.RENDERABLE.REQUIRED
  })
  .options(defaultValidationOptions);


const renderableSchema = Joi.object({
  path: Joi.string()
    .required()
    .messages({
      'any.required': MESSAGES.PATH.REQUIRED
    }),
  iterate: Joi.boolean()
    .required()
    .messages({
      'any.required': MESSAGES.ITERATE.REQUIRED
    }),
  variables: Joi.object().optional(),
  template: Joi.string()
    .required()
    .messages({
      'any.required': MESSAGES.TEMPLATE.REQUIRED
    }),
  partials: Joi.array()
    .items(Joi.string().required())
    .optional(),
  output: Joi.string()
    .required()
    .messages({
      'any.required': MESSAGES.OUTPUT.REQUIRED
    })
})
  .options(
    defaultValidationOptions
  );

const variableSchema = Joi.object({
  path: Joi.string()
    .required()
    .messages({
      'any.required': MESSAGES.VARIABLE.PATH.REQUIRED
    }),
  global: Joi.boolean()
    .optional()
});

const check = (errors: Array<string>, value: unknown, schema: Schema): void => {
  const { error } = schema.validate(value);
  if (error) {
    errors.push(
      ...error.details.map(({ message }) => message)
    );
  }
};


export const validateConfiguration = (cfg: Configuration): void => {
  const errors: Array<string> = [];

  check(errors, cfg, configurationSchema);

  forOwn(cfg.commonVariables, (value) => check(errors, value, variableSchema));

  cfg.renderables && check(errors, Object.keys(cfg.renderables), renderablesListSchema);

  forOwn(cfg.renderables, (renderable) => {
    check(errors, renderable, renderableSchema);

    forOwn(renderable.variables, (variable) => {
      check(errors, variable, variableSchema);
    });
  });

  if (errors.length) {
    throw new Error(uniq(errors).join('\r\n'));
  }
};

