import { IsString } from 'class-validator';

export class GetLatestVersionConfigsDto {
  constructor(obj: Partial<GetLatestVersionConfigsDto>) {
    Object.assign(this, obj);
  }

  @IsString()
  client: string;
}
