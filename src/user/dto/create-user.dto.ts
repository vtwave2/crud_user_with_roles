import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(11)
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  constructor(init: CreateUserDto) {
    Object.assign(this, init);
  }

  asEntity(entity: User): User {
    return Object.assign(entity, this);
  }
}
