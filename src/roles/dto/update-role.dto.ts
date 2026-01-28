import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum } from 'class-validator';
import { Permission } from 'src/common/enum/permission.enum';

export class UpdateUserRolesDto {
  @ApiProperty()
  @IsArray()
  @IsEnum(Permission, { each: true })
  roles: Permission[];
}
