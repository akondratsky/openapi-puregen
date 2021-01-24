import { hello } from 'app/main';

describe('test hello world', () => {
  it('should say it', () => {
    expect(hello()).toBe('world');
  });
});
