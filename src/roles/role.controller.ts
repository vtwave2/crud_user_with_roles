import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiBearerAuth('jwt')
@UseGuards(AuthGuard)
@Controller('role')
export class RoleControler {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create Role' })
  @ApiCreatedResponse({ description: 'Role created with successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.roleService.findOne(id);
  }
}
