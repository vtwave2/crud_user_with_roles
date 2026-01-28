import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { RoleService } from './role.service';
import { RoleControler } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RoleService],
  providers: [RoleService],
  controllers: [RoleControler],
})
export class RolesModule {}
