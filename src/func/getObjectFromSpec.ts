import jp from 'jsonpath';
import { JsonPath, Specification } from 'app/types';

/**
 * @description Returns object from spec, found by path; it can be array or not
 * @param spec - Specification to query
 * @param path - Json Path, targeting to object
 * @param isArray - is this object array or not
 */
export const getObjectFromSpec = (spec: Specification | unknown, path: JsonPath, isArray: boolean): unknown => {
  const queryResult = jp.query(spec, path);
  return isArray ? queryResult : queryResult[0];
};
