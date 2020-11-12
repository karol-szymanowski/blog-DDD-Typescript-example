import { IsIn, IsInt } from 'class-validator';

export interface Config {
  port: number;
}

export class Configs implements Config {
  constructor(configs?: Partial<Config>) {
    if (configs) {
      Object.assign(this, configs);
    }
  }

  @IsInt()
  port: number = Number(process.env.PORT) || 3000;

  @IsIn(['debug', 'info', 'warn', 'error'])
  logLevel: string = process.env.LOG_LEVEL || 'info';
}
