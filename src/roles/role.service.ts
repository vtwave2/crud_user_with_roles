import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RoleRepository } from './repositories/role.repository';
import { DataSource } from 'typeorm';
import { Role } from './entity/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  private readonly roleRepository: RoleRepository;
  constructor(dataSource: DataSource) {
    this.roleRepository = new RoleRepository(dataSource.manager);
  }

  async findOne(id: number): Promise<Role | null> {
    const role = await this.roleRepository.findOneBy({id});

    if (role === null) throw new BadRequestException('Role not found');
    return role;
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }

  async create(createRoleDto: CreateRoleDto): Promise<number> {
    const roleFind = await this.roleRepository.findByCode(createRoleDto.codigo);

    if (roleFind) {
      throw new ConflictException('Código já existente');
    }

    const role = await this.roleRepository.createRole(createRoleDto);
    return role.id;
  }
}
