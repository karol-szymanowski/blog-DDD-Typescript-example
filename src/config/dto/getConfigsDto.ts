import { IsNumber, IsString } from 'class-validator';

export class GetConfigsDto {
  constructor(obj: Partial<GetConfigsDto>) {
    Object.assign(this, obj);
  }

  @IsString()
  client: string;

  @IsNumber()
  version: number;
}
