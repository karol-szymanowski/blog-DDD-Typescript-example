import { IsNumber, IsString, NotEquals } from 'class-validator';

export class UpdateConfigDto {
  constructor(obj: Partial<UpdateConfigDto>) {
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
