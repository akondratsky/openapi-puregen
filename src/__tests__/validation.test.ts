import { validateConfiguration, MESSAGES } from '../validation';
import { Configuration, Renderable } from 'app/types';

const list = (...msgs: string[]) => msgs.join('\r\n');

describe('configuration rules', () => {
  const createRenderablesConfig = (obj: Partial<Renderable> = {}) => ({
    renderables: {
      myComponents: {
        path: '$.path',
        template: 'file.ts',
        output: 'file.ts',
        iterate: true,
        ...obj
      }
    }
  } as unknown as Configuration);


  test.each([
    [
      'fails if no renderables in configuration',
      {
        config: {
          commonVariables: {}
        } as unknown as Configuration,
        expected: 'You should specify at least one renderable'
      }
    ],
    [
      'fails if renderables list is empty',
      {
        config: {
          renderables: {}
        } as unknown as Configuration,
        expected: 'You should specify at least one renderable'
      }
    ],
    [
      'fails if no path specified in renderable',
      {
        config: createRenderablesConfig({
          path: undefined
        }),
        expected: 'You should specify JSON path for each renderable'
      }
    ],
    [
      'fails if no "iterate" option specified in renderable',
      {
        config: createRenderablesConfig({
          iterate: undefined
        }),
        expected: MESSAGES.ITERATE.REQUIRED
      }
    ],
    [
      'fails if no template specified for renderable',
      {
        config: createRenderablesConfig({
          template: undefined
        }),
        expected: 'You should specify template for each renderable'
      }
    ],
    [
      'fails if no output specified for renderable',
      {
        config: createRenderablesConfig({
          output: undefined
        }),
        expected: 'You should specify template for output file name for each renderable'
      }
    ],
    [
      'fails if path not specified for variable',
      {
        config: createRenderablesConfig({
          variables: {
            language: {}
          }
        } as unknown as Partial<Renderable>),
        expected: MESSAGES.VARIABLE.PATH.REQUIRED
      }
    ],
    [
      'fails if renderable is not object, but array',
      {
        config: {
          renderables: []
        },
        expected: list(MESSAGES.RENDERABLE.OBJECT, MESSAGES.RENDERABLE.REQUIRED)
      }
    ],
    [
      'fails on unknown field in configuration',
      {
        config: {
          ...createRenderablesConfig(),
          newField: 42
        },
        expected: MESSAGES.CONFIG.UNKNOWN_FIELD
      }
    ],
    [
      'validates common variables',
      {
        config: {
          ...createRenderablesConfig(),
          commonVariables: {
            variableA: {}
          }
        },
        expected: MESSAGES.VARIABLE.PATH.REQUIRED
      }
    ]
  ])('Case: %s', (description, { config, expected }) => {
    expect(() => {
      validateConfiguration(config as Configuration);
    }).toThrowError(new Error(expected));
  });

  test('do nothing if everything is ok', () => {
    expect(() => {
      validateConfiguration(createRenderablesConfig());
    }).not.toThrow();
  });
});
