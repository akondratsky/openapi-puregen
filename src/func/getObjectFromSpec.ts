import jp from 'jsonpath';
import { JsonPath, Specification } from 'app/types';

/**
 * @description Returns object from spec, found by path.
 * @param spec - Specification to query
 * @param path - Json Path, targeting to object
 */
export const getObjectFromSpec = (spec: Specification | unknown, path: JsonPath): unknown => {
  const queryResult = jp.nodes(spec, path);

  if (queryResult.length > 1) {
    return queryResult.map(({ value }) => value);
  }

  return queryResult[0].value;
};
