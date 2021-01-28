import { render } from '../render';
import { RenderData } from 'app/types';

describe('render method', () => {
  it('renders templates', () => {
    const renderData: Array<RenderData> = [
      {
        variables: { hello: 'hi_variable' },
        template: '{{hello}} {{> welcome}}',
        partials: {
          welcome: 'and hello world'
        },
        output: 'filename'
      }
    ];
    const actual = render(renderData);
    expect(actual).toEqual([{
      output: 'filename',
      content: 'hi_variable and hello world'
    }]);
  });
});
