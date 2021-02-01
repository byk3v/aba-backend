import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateCLientDto {
  @IsString()
  code: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  nickName: string;

  dob: Date;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  gender: string;

  @IsString()
  race: string;

  @IsString()
  primaryLanguage: string;

  @IsString()
  emergencyContact: string;

  @IsString()
  emergencyPhone: string;

  @IsString()
  emergencyEmail: string;

  @IsString()
  notes: string;

  @IsString()
  socialSecurity: string;

  @IsString()
  insurance: string;

  @IsString()
  memberNo: string;

  @IsString()
  mmaPlan: string;

  @IsString()
  mmaIdNo: string;

  active: boolean;
}
