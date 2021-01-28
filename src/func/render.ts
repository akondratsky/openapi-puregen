import mustache from 'mustache';
import { OutputData, RenderData } from 'app/types';

/**
 * @description renders templates to content
 * @param {Array<RenderData>} data
 * @returns {Array<OutputData>}
 */
export const render = (data: RenderData[]): OutputData[] => {
  console.dir(data, { depth: 100 });

  return data.map(({ output, template, variables, partials }) => {
    return {
      output,
      content: mustache.render(template, variables, partials)
    } as OutputData;
  });
};

