import InMemoryConfigStorageRepository from './adapters/inMemoryConfigStorage.repository';
import ConfigService from './config.service';
import Mock = jest.Mock;
import { Config } from './domain/config';
import { NotFoundError } from '../common/errors/errors';

jest.mock('./adapters/inMemoryConfigStorage.repository');

describe('config service', () => {
  const configRepo = new InMemoryConfigStorageRepository();
  const configService = new ConfigService(configRepo);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLatestVersionConfigs', () => {
    it('should return latest version of configs', async () => {
      const client = 'ios';
      const results: Config[] = [
        { id: '1', client, key: 'a', value: 'a1', version: 1 },
        { id: '2', client, key: 'a', value: 'a2', version: 2 },
        { id: '3', client, key: 'b', value: 'b1', version: 1 },
        { id: '4', client, key: 'a', value: 'a3', version: 3 },
      ];

      (configRepo.getConfigs as Mock).mockImplementationOnce(() => Promise.resolve(results));
      const result = configService.GetLatestVersionConfigs({ client });
      await expect(result).resolves.toMatchObject({ a: 'a3', version: 3 });
    });

    it('should throw error if no result was found', async () => {
      const client = 'ios';
      const results: Config[] = [];

      (configRepo.getConfigs as Mock).mockImplementationOnce(() => Promise.resolve(results));
      const result = configService.GetLatestVersionConfigs({ client });
      await expect(result).rejects.toThrow(NotFoundError);
    });
  });

  describe('getConfigsSinceVersion', () => {
    it("should return config's specific version", async () => {
      const client = 'ios';
      const version = 2;
      const results: Config[] = [
        { id: '1', client, key: 'a', value: 'a2', version },
        { id: '2', client, key: 'b', value: 'b2', version },
      ];

      (configRepo.getConfigsVersion as Mock).mockImplementationOnce(() => Promise.resolve(results));
      const result = configService.getConfigs({ version, client });
      await expect(result).resolves.toMatchObject({ a: 'a2', b: 'b2' });
    });

    it('should throw error if no result was found', async () => {
      const client = 'ios';
      const version = 2;
      const results: Config[] = [];

      (configRepo.getConfigsVersion as Mock).mockImplementationOnce(() => Promise.resolve(results));
      const result = configService.getConfigs({ version, client });
      await expect(result).rejects.toThrow(NotFoundError);
    });
  });

  describe('createConfig', () => {
    it('should create new config key', async () => {
      const payload = { version: 1, client: 'ios', key: 'a', value: 'a2' };

      (configRepo.createConfig as Mock).mockImplementationOnce(() => Promise.resolve());
      const result = configService.createConfig(payload);
      await expect(result).resolves.not.toThrow();
      expect(configRepo.createConfig).toHaveBeenCalledWith({ ...payload, id: 'ios-1-a' });
    });
  });

  describe('updateConfig', () => {
    it('should update config value', async () => {
      const payload = { version: 1, client: 'ios', key: 'test', value: 'test' };

      (configRepo.updateConfig as Mock).mockImplementationOnce(() => Promise.resolve());
      const result = configService.updateConfig(payload);
      await expect(result).resolves.not.toThrow();
    });
  });
});
