import { Injectable } from '@nestjs/common';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ListUserDto } from '../dto/list-user.dto';
// import { Role } from '../../roles/enum/roles.enum';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(manager: EntityManager) {
    super(User, manager);
  }

  async paginationList(filter: ListUserDto): Promise<User[]> {
    const { pageStart, pageSize } = filter;
    const query = this.createQueryBuilder('user').select([
      'user.id',
      'user.name',
    ]);

    if (filter.name) {
      query.where('user.name LIKE :name', {
        name: `%${filter.name}%`,
      });
    }

    if (pageSize) {
      const skip = pageStart * pageSize;
      query.skip(skip).take(pageSize);
    }

    return await query.getMany();
  }

  async add(user: CreateUserDto): Promise<User> {
    return await this.save(user);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.delete(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const findUser = await this.getById(id);

    if (findUser) {
      await this.createQueryBuilder('user')
        .update(User)
        .set(updateUserDto)
        .where('id = :id', { id })
        .execute();
      return true;
    }
    return false;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }

  async getById(id: number): Promise<User | null> {
    const user = await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }
}
