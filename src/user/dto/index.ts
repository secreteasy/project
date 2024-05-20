import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createUserDTO {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  userName: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}
export class updateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  userName: string;
  @ApiProperty()
  @IsString()
  email: string;
}
