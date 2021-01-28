import { getObjectFromSpec } from '../getObjectFromSpec';
import freeze from 'deep-freeze';


describe('getObjectFromSpec', () => {
  const spec = freeze({
    'openapi': '3.0.2',
    'servers': [
      'http://localhost:4000',
      'https://google.com'
    ],
    'tags': [
      {
        'name': 'Nodes',
        'description': 'CRUD operations with nodes'
      },
      {
        'name': 'Collections',
        'description': 'CRUD for collections'
      }
    ]
  });

  it('returns simple value for single values', () => {
    const actual = getObjectFromSpec(spec, '$.openapi');
    expect(actual).toBe('3.0.2');
  });

  it('returns array for simple query and array in specification', () => {
    const actual = getObjectFromSpec(spec, '$.servers');
    expect(actual).toEqual(['http://localhost:4000', 'https://google.com']);
  });

  it('returns array for complex query which returns more than one result value', () => {
    const actual = getObjectFromSpec(spec, '$.tags[*].name');
    expect(actual).toEqual(['Nodes', 'Collections']);
  });

  it('returns complex objects with whole tree', () => {
    const actual = getObjectFromSpec(spec, '$.tags[0]');
    expect(actual).toEqual({
      'name': 'Nodes',
      'description': 'CRUD operations with nodes'
    });
  });
});
