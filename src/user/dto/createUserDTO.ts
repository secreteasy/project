import { IsString } from 'class-validator';

export class createUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  userName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
