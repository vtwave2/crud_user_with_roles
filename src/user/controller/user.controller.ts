import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parseInt-id.pipe';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ListUserDto } from '../dto/list-user.dto';
import { Roles } from 'src/common/constants/role.contante';
import { Permissions } from 'src/user/constants/permissions.constants';
import { User } from '../entities/user.entity';

@ApiBearerAuth('jwt-auth')
@ApiTags('User')
@Controller('user')
@UsePipes(ParseIntIdPipe)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ description: 'User created with successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  create(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Permissions.VIEW)
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users returned with success',
  })
  findAll(@Query() pagination: ListUserDto): Promise<User[]> {
    return this.userService.findAll(pagination);
  }

  @Get(':id')
  @Roles(Permissions.VIEW)
  @ApiOperation({ summary: 'Search user for ID' })
  @ApiResponse({ status: 200, description: 'User find' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: number): Promise<Partial<User>> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(Permissions.EDIT)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(Permissions.DELETE)
  @ApiOperation({ summary: 'Remove user' })
  @ApiNoContentResponse({ description: 'User removed' })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
