import { iterateRenderables } from '../iterateRenderables';

jest.mock('../process.ts', () => ({
}));

import { getObjectFromSpec } from '../getObjectFromSpec';
import { extractRenderData } from '../extractRenderData';
import { RenderData } from 'app/types';

jest.mock('../getObjectFromSpec', () => ({
  getObjectFromSpec: jest.fn()
}));
jest.mock('../extractRenderData', () => ({
  extractRenderData: jest.fn()
}));

const getObjectFromSpecMock = getObjectFromSpec as jest.Mock<unknown>;
const extractRenderDataMock = extractRenderData as jest.Mock<RenderData>;

describe('iterateRenderables', () => {
  const apiStub = {
    'openapi': '3.0.2',
    'info': {
      'title': 'Starway APIs',
      'version': '1.0'
    },
    'paths': {
      '/nodes': {
        'summary': 'CRUD operations for nodes.',
        'description': 'Pay your attention that we are using POST instead of GET by the reason of high-weighted request bodies.',
        'get': {
          'summary': 'Get single node',
          'description': 'Since searching is too diffucult for GET request, we can use it to get single nodes by ID.',
          'operationId': 'getNodeById',
          'responses': {
            '200': {
              'description': 'Node was found',
              'content': {
                'application/json': {
                  'schema': {
                    '$ref': '#/components/schemas/Node'
                  }
                }
              }
            }
          }
        }
      },
      '/collections': {
        'summary': 'CRUD for collections',
        'description': 'POST for search.',
        'get': {
          'tags': [
            'Collections'
          ],
          'summary': 'Get single collection',
          'description': 'description is absent',
          'operationId': 'getAllCollections',
          'responses': {
            '200': {
              'description': 'Collections returned',
              'content': {
                'application/json': {
                  'schema': {
                    '$ref': '#/components/schemas/Collections'
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const defaultRenderData: RenderData = {
    output: '',
    partials: {},
    template: '',
    variables: {}
  };

  afterEach(jest.clearAllMocks);

  it('iterates if renderable marked as iterable', () => {
    const configWithIteration = {
      'renderables': {
        'paths': {
          'path': '$.paths',
          'iterate': true,
          'template': './template/model.mustache',
          'output': './models/{{name}}.ts'
        }
      }
    };

    getObjectFromSpecMock.mockReturnValue({
      '/path1': {},
      '/path2': {}
    });
    extractRenderDataMock.mockReturnValue(defaultRenderData);

    const actual = iterateRenderables({ spec: apiStub, cfg: configWithIteration });
    expect(getObjectFromSpecMock).toHaveBeenCalledTimes(1); // only one renderable in config
    expect(getObjectFromSpecMock).toHaveBeenCalledWith(apiStub, '$.paths');
    expect(extractRenderData).toHaveBeenCalledTimes(2); // one time per each path (path1 and path2)
    expect(actual).toEqual([defaultRenderData, defaultRenderData]);
  });


  it('creates single output for renderable if no necessity to iterate', () => {
    const configWithoutIteration = {
      'renderables': {
        'readme': {
          'path': '$.ways',
          'iterate': false,
          'template': './template/readme.mustache',
          'variables': {
            'schemaName': {
              'path': '$.info.title',
              'global': true
            }
          },
          'output': './readme.md'
        }
      }
    };
    getObjectFromSpecMock.mockReturnValue({
      '/path1': {},
      '/path2': {}
    });
    extractRenderDataMock.mockReturnValue(defaultRenderData);

    const actual = iterateRenderables({ spec: apiStub, cfg: configWithoutIteration });
    expect(getObjectFromSpecMock).toHaveBeenCalledTimes(1); // only one renderable in config
    expect(getObjectFromSpecMock).toHaveBeenCalledWith(apiStub, '$.ways');
    expect(extractRenderData).toHaveBeenCalledTimes(1); // because it wasn't marked as iterable
    expect(actual).toEqual([defaultRenderData]);
  });
});
