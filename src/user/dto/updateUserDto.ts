import { IsString } from 'class-validator';

export class updateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  userName: string;

  @IsString()
  email: string;
}
