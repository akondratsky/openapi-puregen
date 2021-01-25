import mustache from 'mustache';
import { RenderData, MappingInputData, Renderable } from 'app/types';
import { gatherVariableValues } from './index';

/**
 * @description extracts all render data from source accordingly to options
 * @param source
 * @param mappingInputData
 */
export const extractRenderData = (
  source: unknown,
  name: string,
  options: Partial<Renderable>,
  mappingInputData: MappingInputData
): RenderData => {
  const { variables: variablesConfig, template, partials, output } = options;
  const variables = !variablesConfig ? {} : gatherVariableValues(source, variablesConfig, mappingInputData);
  variables.name = name;

  // TODO: load templates and partials

  return {
    template,
    variables,
    partials,
    output: mustache.render(output as string, variables)
  } as RenderData;
};
