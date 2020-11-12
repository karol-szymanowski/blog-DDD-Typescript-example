import { ConfigRepository, newSortedConfigs, newConfig } from './domain/config';
import { NotFoundError } from '../common/errors/errors';
import { Validate } from '../common/decorators/validate';
import { CreateConfigDto } from './dto/createConfig.dto';
import { DeleteConfigDto } from './dto/deleteConfig.dto';
import { GetLatestVersionConfigsDto } from './dto/getLatestVersionConfigs.dto';
import { GetConfigsDto } from './dto/getConfigsDto';
import { UpdateConfigDto } from './dto/updateConfig.dto';

interface getLatestVersionConfigs {
  [key: string]: string | number;
  version: number;
}

interface getConfigs {
  [key: string]: string;
}

export default class ConfigService {
  constructor(private readonly repo: ConfigRepository) {}

  @Validate(GetLatestVersionConfigsDto)
  async GetLatestVersionConfigs(payload: GetLatestVersionConfigsDto): Promise<getLatestVersionConfigs> {
    const configs = await this.repo.getConfigs(payload.client);
    if (!configs.length) {
      throw new NotFoundError('No configs found');
    }
    const mappedConfigs = newSortedConfigs(configs);
    const clientVersions = Object.keys(mappedConfigs).map((value) => Number(value));
    const highestClientVersion = Math.max(...clientVersions);
    return { ...mappedConfigs[highestClientVersion], version: highestClientVersion };
  }

  @Validate(GetConfigsDto)
  async getConfigs(payload: GetConfigsDto): Promise<getConfigs> {
    const configs = await this.repo.getConfigsVersion(payload.client, payload.version);
    if (!configs.length) {
      throw new NotFoundError('No configs found');
    }
    return newSortedConfigs(configs)[payload.version];
  }

  @Validate(CreateConfigDto)
  async createConfig(payload: CreateConfigDto): Promise<void> {
    const clientConfig = newConfig(payload);
    await this.repo.createConfig(clientConfig);
  }

  @Validate(DeleteConfigDto)
  async deleteConfig(payload: DeleteConfigDto): Promise<void> {
    await this.repo.deleteConfig(payload.client, payload.version);
  }

  @Validate(UpdateConfigDto)
  async updateConfig(payload: UpdateConfigDto): Promise<void> {
    const clientConfig = newConfig(payload);
    await this.repo.updateConfig(clientConfig);
  }
}
