import { EntityManager, Repository } from 'typeorm';
import { UserRole } from '../entities/user-role.entity';

export class UserRoleRepository extends Repository<UserRole> {
  constructor(manager: EntityManager) {
    super(UserRole, manager);
  }

  existeRole(id: number, roleId: number): Promise<UserRole | null> {
    return this.createQueryBuilder('urer_role')
      .where('urer_role.userId = :userId', { userId: id })
      .andWhere('urer_role.roleId = :roleId', { roleId })
      .getOne();
  }

  getRoles(userId: number): Promise<UserRole[]> {
    return this.createQueryBuilder('userRole')
      .innerJoin('userRole.role', 'role')
      .innerJoin('userRole.user', 'user')
      .select([
        'user.id',
        'user.name',
        'userRole.id',
        'role.codigo',
        'role.nome',
      ])
      .where('user.id = :userId', { userId })
      .getMany();
  }

  getUserForCodigo(codigo: string): Promise<UserRole[]> {
    return this.createQueryBuilder('userRole')
      .innerJoin('userRole.role', 'role')
      .innerJoin('userRole.user', 'user')
      .select([
        'user.id',
        'user.name',
        'userRole.id',
        'role.codigo',
        'role.nome',
      ])
      .where('role.codigo = :codigo', { codigo })
      .getMany();
  }

  getUserRoles(userId: number, rolerId: number): Promise<UserRole[]> {
    return this.createQueryBuilder('userRole')
      .where('userRole.roleId = :rolerId', { rolerId })
      .andWhere('userRole.userId = :userId', { userId })
      .getMany();
  }
}
