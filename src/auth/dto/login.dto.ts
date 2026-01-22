import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({example: 'huot1@gmail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: '2323345678'})
  @IsString()
  password: string;
}
