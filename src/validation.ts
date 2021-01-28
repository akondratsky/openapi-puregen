import Joi, { Schema } from 'joi';
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
  global: Joi.boolean().optional()
});

const renderableSchema = Joi.object({
  path: Joi.string().required(),
  iterate: Joi.boolean().required(),
  variables: Joi.object().optional(),
  template: Joi.string().required(),
  partials: Joi.array().items(Joi.string().required()),
  output: Joi.string().required()
});

export const validateConfiguration = (cfg: Configuration): void => {
  check(configurationSchema, cfg);
  forOwn(cfg.commonVariables, (value) => {
    check(variableSchema, value);
  });
  forOwn(cfg.renderables, (renderable) => {
    check(renderableSchema, renderable);
  });
  forOwn(cfg.renderables.variables, (variable) => {
    check(variableSchema, variable);
  });
};

const check = (schema: Schema, value: unknown): void => {
  const { errors, error } = schema.validate(value);
  if (errors || error) {
    console.error(errors || error);
    throw new Error('Validation error!');
  }
};
