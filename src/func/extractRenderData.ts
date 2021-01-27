import mustache from 'mustache';
import { RenderData, MappingInputData, Renderable } from 'app/types';
import { gatherVariableValues } from './index';
import { loadPartials, loadTemplate } from 'app/files';

/**
 * @description extracts all render data from source accordingly to options
 * @param source
 * @param mappingInputData
 */
export const extractRenderData = (
  source: unknown,
  name: string,
  options: Renderable,
  mappingInputData: MappingInputData
): RenderData => {
  const { variables: variablesConfig, template, partials, output } = options;
  const variables = !variablesConfig ? {} : gatherVariableValues(source, variablesConfig, mappingInputData);
  variables.name = name;

  return {
    template: loadTemplate(template),
    variables,
    partials: loadPartials(partials),
    output: mustache.render(output, variables)
  } as RenderData;
};
