import { MappingInputData } from 'app/types';
import { gatherVariableValues } from '../gatherVariableValues';
import { getCommonVariables, getObjectFromSpec } from '../index';

import freeze from 'deep-freeze';

jest.mock('../index', () => ({
  getCommonVariables: jest.fn(),
  getObjectFromSpec: jest.fn()
}));

const getCommonVariablesMock = getCommonVariables as jest.Mock<Record<string, unknown>>;
const getObjectFromSpecMock = getObjectFromSpec as jest.Mock<unknown>;

describe('gatherVariableValues', () => {
  const localSourceStub = Symbol.for('localSourceStub');
  const mappingInputDataStub: MappingInputData = freeze({
    spec: {
      meaningOfLife: 42
    },
    cfg: {
      renderables: {}
    }
  });

  afterEach(jest.clearAllMocks);

  it('uses common variables', () => {
    const commonVariablesStub = { testCommonVariable: 'testValue' };
    getCommonVariablesMock.mockImplementation(() => commonVariablesStub);
    const variablesCfg = {};
    const actual = gatherVariableValues(localSourceStub, variablesCfg, mappingInputDataStub);
    expect(actual).toBe(commonVariablesStub);
  });

  it('uses whole specification to query global variables', () => {
    getCommonVariablesMock.mockReturnValue({});
    getObjectFromSpecMock.mockReturnValue('got_value');
    const variablesCfg = {
      testVariable: {
        path: '$.my.path',
        global: true
      }
    };

    const actual = gatherVariableValues(localSourceStub, variablesCfg, mappingInputDataStub);

    expect(getObjectFromSpecMock).toHaveBeenCalledWith(mappingInputDataStub.spec, '$.my.path');
    expect(actual).toEqual({ testVariable: 'got_value' });
  });

  it('uses local values by default', () => {
    getCommonVariablesMock.mockReturnValue({});
    getObjectFromSpecMock.mockReturnValue('got_value');
    const variablesCfg = {
      testVariable: {
        path: '$.my.path',
        global: false
      }
    };

    const actual = gatherVariableValues(localSourceStub, variablesCfg, mappingInputDataStub);

    expect(getObjectFromSpecMock).toHaveBeenCalledWith(localSourceStub, '$.my.path');
    expect(actual).toEqual({ testVariable: 'got_value' });
  });
});
