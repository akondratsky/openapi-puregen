import { forOwn } from 'lodash';
import { RenderData, MappingInputData } from 'app/types';

import { getObjectFromSpec, extractRenderData } from './index';

/**
 * @description iterates over renderables list and prepares a bunch of objects to output
 * @param mappingInputData
 */
export const iterateRenderables = (mappingInputData: MappingInputData): Array<RenderData> => {
  const renderData: Array<RenderData> = [];

  forOwn(mappingInputData.cfg.renderables, ({
    path,
    isArray,
    iterate,
    ...options
    // output: outputTemplate,
    // variables: variablesConfig,
    // template,
    // partials
  },
  topLevelRenderableName
  ) => {
    const topLevelSource = getObjectFromSpec(mappingInputData.spec, path, isArray);

    if (iterate) {
      forOwn(topLevelSource, (source, renderableName) => {
        renderData.push(extractRenderData(source, renderableName, options, mappingInputData));
      });
    } else {
      renderData.push(
        extractRenderData(topLevelSource, topLevelRenderableName, options, mappingInputData)
      );
    }
  });

  return renderData;
};
