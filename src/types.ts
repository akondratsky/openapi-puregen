export type JsonPath = string;


/**
 * @description parsed scheme (OpenAPI or any other)
 */
export type Specification = Record<string, unknown>;


export interface Variable {
  /** Json Path to value in specification */
  path: JsonPath;
  /** Is this field in specification is array */
  isArray: boolean;
  /** if false, path applies relatively current iterable */
  global: boolean;
}

/**
 * Renderable is kind of object which contains information about template type.
 */
export interface Renderable {
  /** Json Path, base of renderable */
  path: JsonPath;
  /** is object, specified by path, array */
  isArray: boolean;
  /** are we need to iterate this renderables or it is just simple render */
  iterate: boolean;
  /** this list will be used together with commonVariables in template */
  variables?: Record<string, Variable>;
  /** path to main mustaches */
  template: string;
  /** paths to mustache partials  */
  partials?: string[];
  /** template for filename for current renderable */
  output: string;
  // TODO: I need to add smth like "name" here to represent name of renderable
}

export interface Configuration {
  /**
   * list of variables which will be applied for all of the renderables;
   * if renderable has variable with same name, it will be overrided
   */
  commonVariables: Record<string, Variable>;
  renderables: Record<string, Renderable>;
}


export interface RenderData {
  /** variables which will be used with template */
  variables: Record<string, unknown>;
  /** path to main mustaches */
  template: string;
  /** paths to mustache partials  */
  partials: Record<string, string>;
  /** filename */
  output: string;
}


export interface MappingInputData {
  spec: Specification;
  cfg: Configuration;
}
