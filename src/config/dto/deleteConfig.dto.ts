import { IsNumber, IsString } from 'class-validator';

export class DeleteConfigDto {
  constructor(obj: Partial<DeleteConfigDto>) {
    Object.assign(this, obj);
  }

  @IsNumber()
  version: number;

  @IsString()
  client: string;
}
