import { IsString } from 'class-validator';

export class SetActiveDto {
  @IsString()
  id: string;

  @IsString()
  active: string;
}
