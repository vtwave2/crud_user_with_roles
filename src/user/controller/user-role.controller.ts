import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { UserService } from '../user.service';
import { Roles } from 'src/common/constants/role.contante';
import { Permissions } from 'src/user/constants/permissions.constants';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserRole } from '../entities/user-role.entity';

@ApiBearerAuth('jwt-auth')
@ApiTags('User Roles')
@UseGuards(AuthGuard)
@Controller('user/:id/role')
export class UserRoleController {
  constructor(private readonly userService: UserService) {}
  @Post(':roleId')
  @Roles(Permissions.CREATE)
  @ApiOperation({ summary: 'Atribuir user roles' })
  @ApiResponse({ status: 200, description: 'User role atribuida' })
  @ApiResponse({ status: 404, description: 'User roles not found' })
  async atribuirRole(
    @Param('id') id: number,
    @Param('roleId') roleId: number,
  ): Promise<number> {
    return await this.userService.addRoles(id, roleId);
  }

  @Get()
  @Roles(Permissions.VIEW)
  @ApiOperation({ summary: 'Get users roles' })
  @ApiResponse({ status: 200, description: 'User find' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findUsersForRoles(@Param('id') user_id: number): Promise<UserRole[]> {
    return this.userService.getUserRoles(user_id);
  }

  @Get(':codigo')
  @Roles(Permissions.VIEW)
  @ApiOperation({ summary: 'Get users for roles code' })
  @ApiResponse({ status: 200, description: 'User find' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findRoles(@Param('codigo') codigo: string): Promise<UserRole[]> {
    return this.userService.getUserForCodigo(codigo);
  }
}
