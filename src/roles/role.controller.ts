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
import { Permission } from 'src/common/enum/permission.enum';

@ApiBearerAuth('jwt-auth')
@ApiTags('Roles')
@UseGuards(AuthGuard)
@Controller('role')
export class RoleControler {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(Permission.CREATE)
  @ApiOperation({ summary: 'Create Role' })
  @ApiCreatedResponse({ description: 'Role created with successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @Roles(Permission.VIEW)
  @ApiOperation({ summary: 'Get all Roles' })
  async findAll() {
    return await this.roleService.findAll();
  }
  
  @Get(':id')
  @Roles(Permission.VIEW)
  @ApiOperation({ summary: 'Get Role' })
  async findOne(@Param('id') id: number) {
    return await this.roleService.findOne(id);
  }
}
