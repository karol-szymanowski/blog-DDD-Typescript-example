import { Config, newConfig, newSortedConfigs } from './config';

describe('Config', () => {
  it('should return config object', () => {
    const config = { client: 'ios', version: 1, key: 'key', value: 'test' };
    const result = newConfig(config);

    expect(result.id).toEqual('ios-1-key');
  });

  it('should return sorted configs', () => {
    const config: Config[] = [
      { id: '1', client: 'ios', version: 1, key: 'a', value: 'a1' },
      { id: '2', client: 'ios', version: 1, key: 'b', value: 'b1' },
      { id: '3', client: 'ios', version: 2, key: 'a', value: 'a2' },
    ];
    const result = newSortedConfigs(config);

    expect(result[1]).toHaveProperty('a', 'a1');
    expect(result[1]).toHaveProperty('b', 'b1');
    expect(result[2]).toHaveProperty('a', 'a2');
  });
});
