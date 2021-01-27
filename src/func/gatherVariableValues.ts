import { forOwn } from 'lodash';
import { Variable, MappingInputData } from 'app/types';
import { getCommonVariables, getObjectFromSpec } from './index';


/**
 * @description takes configuration and gathering values - to use them in render
 * @param {unknown} localSource - object from where local variables are gathered
 * @param {Array<Variable>} variables - variables configuration object
 * @param {MappingInputData} mappingInputData
 */
export const gatherVariableValues = (
  localSource: unknown,
  variables: Record<string, Variable>,
  mappingInputData: MappingInputData
): Record<string, unknown> => {
  const gatheredValues: Record<string, unknown> = getCommonVariables(mappingInputData);
  forOwn(variables, ({ global, isArray, path }, name) => {
    const source = global ? mappingInputData.spec : localSource;
    gatheredValues[name] = getObjectFromSpec(source, path, isArray);
  });
  return gatheredValues;
};
