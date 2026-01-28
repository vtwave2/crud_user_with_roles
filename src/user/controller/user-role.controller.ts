import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { UserService } from '../user.service';
import { Roles } from 'src/common/constants/role.contante';
import { Permission } from 'src/common/enum/permission.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard)
@Controller('user/:id/role')
export class UserRoleController {
  constructor(private readonly userService: UserService) {}
  @Post(':roleId')
  @Roles(Permission.CREATE)
  @ApiOperation({ summary: 'Atribuir user roles' })
  @ApiResponse({ status: 200, description: 'User role atribuida' })
  @ApiResponse({ status: 404, description: 'User roles not found' })
  async atribuirRole(@Param('id') id: number, @Param('roleId') roleId: number) {
    return await this.userService.addRoles(id, roleId);
  }

  @Get()
  @Roles(Permission.VIEW)
  @ApiOperation({ summary: 'Get users for roles' })
  @ApiResponse({ status: 200, description: 'Users find' })
  @ApiResponse({ status: 404, description: 'Users not found' })
  findUsersForRoles(@Param('id') user_id: number) {
    return this.userService.getUserRoles(user_id);
  }

  @Get(':rolesId')
  @Roles(Permission.VIEW)
  @ApiOperation({ summary: 'Get users for roles' })
  @ApiResponse({ status: 200, description: 'Users find' })
  @ApiResponse({ status: 404, description: 'Users not found' })
  findRoles(@Param('id') user_id: number) {
    return this.userService.getUserRoles(user_id);
  }
}
