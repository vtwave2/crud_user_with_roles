import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({example: 'joao2@gmail.com'})
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(11)
  email: string;
  
  @ApiProperty({example: 'joao@123', description: 'userPassword'})
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
