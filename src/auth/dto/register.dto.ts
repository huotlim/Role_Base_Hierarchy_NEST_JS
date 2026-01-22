import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({example: 'okkman@gmail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: '11111111'})
  @IsString()
  @MinLength(6)
  password: string;
}
