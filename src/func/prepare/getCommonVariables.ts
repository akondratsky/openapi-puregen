import { forOwn } from 'lodash';
import { MappingInputData } from 'app/types';
import { getObjectFromSpec } from './index';

/**
 * @description with help of configuration extracts list of common variables from specification
 * @param spec - Specification from where values will be taken
 * @param cfg - configuration file, contains information about expected variables
 */
export const getCommonVariables = ({ spec, cfg }: MappingInputData): Record<string, unknown> => {
  const variables: Record<string, unknown> = {};
  forOwn(cfg.commonVariables, ({ path, isArray }, key) => {
    variables[key] = getObjectFromSpec(spec, path, isArray);
  });
  return variables;
};
