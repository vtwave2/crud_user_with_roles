import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateUserRolesDto {
  @ApiProperty()
  @IsArray()
  roles: string;
}
