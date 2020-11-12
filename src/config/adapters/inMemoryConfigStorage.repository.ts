import { Config, ConfigRepository, newConfig } from '../domain/config';
import { IncorrectInputError, NotFoundError } from '../../common/errors/errors';

const inMemoryStorage: Config[] = [
  newConfig({ client: 'string', version: 1, value: 'string', key: 'string' }),
  newConfig({ client: 'ios', version: 1, value: 'ios1', key: 'string' }),
  newConfig({ client: 'ios', version: 1, value: 'test', key: 'string2' }),
  newConfig({ client: 'ios', version: 2, value: 'ios2', key: 'string' }),
  newConfig({ client: 'pc', version: 1, value: 'windows', key: 'system' }),
  newConfig({ client: 'android', version: 3, value: 'string', key: 'test' }),
  newConfig({ client: 'android', version: 1, value: 'string', key: 'string' }),
];

export default class InMemoryConfigStorageRepository implements ConfigRepository {
  async createConfig(payload: Config): Promise<void> {
    const records = inMemoryStorage.filter((record) => record.id === payload.id);
    if (records.length > 0) {
      throw new IncorrectInputError('Record already exists');
    }
    inMemoryStorage.push(payload);
  }

  async deleteConfig(client: string, version: number): Promise<void> {
    const indexesToBeRemoved = inMemoryStorage.reduce(function (found, record, index) {
      if (record.client === client && record.version === version) {
        found.push(index);
      }
      return found;
    }, [] as number[]);

    if (!indexesToBeRemoved.length) {
      throw new NotFoundError("Record doesn't exist");
    }

    const sortedIndexesToBeRemoved = indexesToBeRemoved.sort((a, b) => b - a);

    while (sortedIndexesToBeRemoved.length) {
      inMemoryStorage.splice(sortedIndexesToBeRemoved.pop()!, 1);
    }
  }

  async getConfigs(client: string): Promise<Config[]> {
    return inMemoryStorage.filter((record) => record.client === client);
  }

  async getConfigsVersion(client: string, version: number): Promise<Config[]> {
    return inMemoryStorage.filter((record) => record.version === version && record.client === client);
  }

  async updateConfig(payload: Config): Promise<void> {
    const recordIndex = inMemoryStorage.findIndex((record) => record.id === payload.id);
    if (recordIndex < 0) {
      throw new NotFoundError("Record doesn't exist");
    }
    inMemoryStorage[recordIndex].value = payload.value;
  }
}
