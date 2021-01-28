import { forOwn } from 'lodash';
import { RenderData, MappingInputData } from 'app/types';

import { getObjectFromSpec } from './getObjectFromSpec';
import { extractRenderData } from './extractRenderData';

/**
 * @description iterates over renderables list and prepares a bunch of objects to output
 * @param mappingInputData
 */
export const iterateRenderables = (mappingInputData: MappingInputData): Array<RenderData> => {
  const renderData: Array<RenderData> = [];

  forOwn(mappingInputData.cfg.renderables, (renderableData, topLevelRenderableName) => {
    const { path, iterate } = renderableData;
    const topLevelSource = getObjectFromSpec(mappingInputData.spec, path);

    if (iterate) {
      forOwn(topLevelSource, (source, renderableName) => {
        renderData.push(extractRenderData(source, renderableName, renderableData, mappingInputData));
      });
    } else {
      renderData.push(
        extractRenderData(topLevelSource, topLevelRenderableName, renderableData, mappingInputData)
      );
    }
  });

  return renderData;
};
