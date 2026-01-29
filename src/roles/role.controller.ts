import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/constants/role.contante';
import { Permissions } from 'src/user/constants/permissions.constants';
import { Role } from './entity/role.entity';

@ApiBearerAuth('jwt-auth')
@ApiTags('Roles')
@UseGuards(AuthGuard)
@Controller('role')
export class RoleControler {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(Permissions.CREATE)
  @ApiOperation({ summary: 'Create Role' })
  @ApiCreatedResponse({ description: 'Role created with successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  create(@Body() createRoleDto: CreateRoleDto): Promise<number> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @Roles(Permissions.VIEW)
  @ApiOperation({ summary: 'Get all Roles' })
  async findAll(): Promise<Role[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @Roles(Permissions.VIEW)
  @ApiOperation({ summary: 'Get Role' })
  async findOne(@Param('id') id: number): Promise<Role | null> {
    return await this.roleService.findOne(id);
  }
}
