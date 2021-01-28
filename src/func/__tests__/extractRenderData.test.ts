import deepFreeze from 'deep-freeze';
import { extractRenderData } from '../extractRenderData';

import { gatherVariableValues } from '../index';
import { loadPartials, loadTemplate } from 'app/files';
import { MappingInputData, Renderable, Variable } from 'app/types';

jest.mock('../index', () => ({
  gatherVariableValues: jest.fn()
}));
jest.mock('app/files', () => ({
  loadPartials: jest.fn(),
  loadTemplate: jest.fn()
}));

const gatherVariableValuesMock = gatherVariableValues as jest.Mock<Record<string, unknown>>;
const loadPartialsMock = loadPartials as jest.Mock<Record<string, string>>;
const loadTemplateMock = loadTemplate as jest.Mock<string>;


describe('extractRenderData', () => {
  const sourceStub = deepFreeze({});
  const nameStub = 'nameStub';
  const defaultOptionsStub = deepFreeze({
    variables: {} as Record<string, Variable>,
    template: './template_name_stub',
    partials: ['./partial1', './partial2'],
    output: './filename.txt'
  });
  const mappingInputDataStub: MappingInputData = deepFreeze({
    spec: {
      meaningOfLife: 42
    },
    cfg: {
      renderables: {}
    }
  });

  afterEach(jest.clearAllMocks);

  it('gathers variable values and adds name of variable as "name" property', () => {
    const variablesConfig = { test: { path: '$.path', global: false } } as Record<string, Variable>;
    const options = { ...defaultOptionsStub, variables: variablesConfig } as Renderable;
    const gatherVariableValuesResult = { unexpected: 'spanish_inquisition' };
    gatherVariableValuesMock.mockReturnValue(gatherVariableValuesResult);

    const actual = extractRenderData(sourceStub, nameStub, options, mappingInputDataStub);
    expect(gatherVariableValuesMock).toHaveBeenCalledWith(sourceStub, variablesConfig, mappingInputDataStub);
    expect(actual.variables).toEqual({
      ...gatherVariableValuesResult,
      name: nameStub
    });
  });

  it('loads templates and partials', () => {
    const options = { ...defaultOptionsStub, variables: undefined } as Renderable;
    loadTemplateMock.mockReturnValue('loaded_template');
    loadPartialsMock.mockReturnValue({ partialName: 'loaded_partial' });
    const actual = extractRenderData(sourceStub, nameStub, options, mappingInputDataStub);
    expect(actual.template).toBe('loaded_template');
    expect(actual.partials).toEqual({ partialName: 'loaded_partial' });
  });

  it('renders output name with mustasches', () => {
    const options = {
      ...defaultOptionsStub,
      variables: undefined,
      output: './someFolder/{{name}}.dance'
    } as Renderable;
    const actual = extractRenderData(sourceStub, nameStub, options, mappingInputDataStub);
    expect(actual.output).toBe('./someFolder/nameStub.dance');
  });
});
