import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UserRole } from './entities/user-role.entity';
import { UserRoleController } from './controller/user-role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole]), RolesModule],
  controllers: [UserController, UserRoleController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
