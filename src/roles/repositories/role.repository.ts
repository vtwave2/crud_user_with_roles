import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(manager: EntityManager) {
    super(Role, manager);
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.save(createRoleDto);
  }

  async findById(id: number): Promise<Role | null> {
    return await this.findOneBy({ id });
  }

  async findByCode(codigo: string) {
    return this.createQueryBuilder('role')
      .where('role.codigo = :codigo', { codigo })
      .getOne();
  }

  async findAll(): Promise<Role[]> {
    return await this.find();
  }
}
