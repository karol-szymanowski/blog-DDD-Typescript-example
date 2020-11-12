export interface Config {
  id: string;
  client: string;
  version: number;
  key: string;
  value: string;
}

interface SortedConfigs {
  [version: number]: { [key: string]: string };
}

export function newConfig(payload: { client: string; version: number; key: string; value: string }): Config {
  const id = clientConfigId(payload.client, payload.version, payload.key);
  return { id, client: payload.client, key: payload.key, value: payload.value, version: payload.version };
}

export function clientConfigId(client: string, version: number, key: string): string {
  return `${client}-${version}-${key}`;
}

export function newSortedConfigs(configs: Config[]): SortedConfigs {
  return configs.reduce((previousValue, currentValue) => {
    const newVal = previousValue;
    if (!newVal[currentValue.version]) {
      newVal[currentValue.version] = {};
    }
    newVal[currentValue.version][currentValue.key] = currentValue.value;
    return newVal;
  }, {} as SortedConfigs);
}

export interface ConfigRepository {
  createConfig(payload: Config): Promise<void>;
  updateConfig(payload: Config): Promise<void>;
  deleteConfig(client: string, version: number): Promise<void>;
  getConfigs(client: string): Promise<Config[]>;
  getConfigsVersion(client: string, version: number): Promise<Config[]>;
}
