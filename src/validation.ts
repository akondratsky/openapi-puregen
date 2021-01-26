import Joi, { ValidationError } from 'joi';
import { Configuration } from 'app/types';
import { forOwn } from 'lodash';

const configurationSchema = Joi.object({
  commonVariables: Joi.object()
    .optional(),
  renderables: Joi.object()
    .required()
});

const variableSchema = Joi.object({
  path: Joi.string().required(),
  isArray: Joi.boolean().required(),
  global: Joi.boolean().optional()
});

const renderableSchema = Joi.object({
  path: Joi.string().required(),
  isArray: Joi.boolean().required(),
  iterate: Joi.boolean().required(),
  variables: Joi.object().optional(),
  template: Joi.string().required(),
  partials: Joi.array().items(Joi.string().required())
});

export const validateConfiguration = (cfg: Configuration): void => {
  check(configurationSchema.validate(cfg).errors);
  forOwn(cfg.commonVariables, (value) => {
    check(variableSchema.validate(value).errors);
  });
  forOwn(cfg.renderables, (renderable) => {
    check(renderableSchema.validate(renderable).errors);
  });
};

const check = (errors?: ValidationError): void => {
  if (errors) {
    console.error(errors);
    throw new Error('validation error!');
  }
};
