import { IsOptional, IsString } from 'class-validator';
import { Role } from '../entity/role.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observacao?: string;

  constructor(createRoleDto: CreateRoleDto) {
    Object.assign(this, createRoleDto);
  }

  asEntity(role: Role) {
    return Object.assign(role, this);
  }
}
