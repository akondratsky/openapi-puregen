import { Configuration, Specification } from 'app/types';
import freeze from 'deep-freeze';
import { getCommonVariables } from '../getCommonVariables';


describe('getCommonVariables', () => {
  const spec: Specification = freeze({
    info: {
      title: 'Starway APIs',
      version: '1.0'
    },
    servers: [
      { url: 'http://localhost:4000' },
      { url: 'https://google.com' }
    ]
  });

  const cfg: Configuration = freeze({
    commonVariables: {
      apiTitle: '$.info.title',
      servers: '$.servers[*].url',
      info: '$.info'
    },
    renderables: {}
  });

  let variables: any = null;  // eslint-disable-line

  beforeEach(() => {
    variables = getCommonVariables({ spec, cfg });
  });

  it('maps primitive values', () => {
    expect(variables.apiTitle).toEqual('Starway APIs');
  });

  it('return arrays for complex queries which get multiple values', () => {
    expect(variables.servers).toEqual(['http://localhost:4000', 'https://google.com']);
  });

  it('returns object for queries which returns non-primitive values', () => {
    expect(variables.info).toEqual({
      title: 'Starway APIs',
      version: '1.0'
    });
  });
});
