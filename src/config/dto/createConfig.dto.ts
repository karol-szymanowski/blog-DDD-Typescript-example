import { IsNumber, IsString, NotEquals } from 'class-validator';

export class CreateConfigDto {
  constructor(obj: Partial<CreateConfigDto>) {
    Object.assign(this, obj);
  }

  @IsString()
  client: string;

  @IsNumber()
  version: number;

  @IsString()
  @NotEquals('version')
  key: string;

  @IsString()
  value: string;
}
