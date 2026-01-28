import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { DataSource } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserDto } from './dto/list-user.dto';
// import { Role } from 'src/roles/entity/role.entity';
import { RoleRepository } from 'src/roles/repositories/role.repository';
import { UserRole } from './entities/user-role.entity';
import { UserRoleRepository } from './repositories/user-role.repository';

@Injectable()
export class UserService {
  private userRepository: UserRepository;
  private roleRepository: RoleRepository;
  private userRoleRepository: UserRoleRepository;

  constructor(dataSource: DataSource) {
    this.userRepository = new UserRepository(dataSource.manager);
    this.roleRepository = new RoleRepository(dataSource.manager);
    this.userRoleRepository = new UserRoleRepository(dataSource.manager);
  }

  async create(createUserDto: CreateUserDto): Promise<number> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const user = new CreateUserDto(createUserDto).asEntity(new User());
    user.password = passwordHash;

    await this.userRepository.save(user);

    return user.id;
  }

  async findAll(pagination: ListUserDto): Promise<User[]> {
    return this.userRepository.paginationList(pagination);
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.getById(id);
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async addRoles(id: number, roleId: number): Promise<number> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    const roles = await this.roleRepository.findById(roleId);

    if (!roles) {
      throw new BadRequestException('Roles not found');
    }

    const existRole = await this.userRoleRepository.existeRole(id, roleId);

    if (existRole) {
      throw new BadRequestException('Role attributed exist');
    }

    const userRole = new UserRole({
      userId: id,
      roleId,
    });
    const userRoleASave = await this.userRoleRepository.save(userRole);
    return userRoleASave.id;
  }

  async getUserRoles(user_id: number): Promise<UserRole[]> {
    const user = await this.userRoleRepository.getRoles(user_id);
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }
    await this.userRepository.delete(id);
    return;
  }

  async getRoles(userId: number, roleId: number) {
    return await this.userRoleRepository.getUserRoles(userId, roleId);
  }
}
