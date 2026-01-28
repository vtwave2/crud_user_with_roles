import { UserRole } from 'src/user/entities/user-role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  codigo: string;

  @Column()
  observacao?: string;

  @OneToMany(() => UserRole, (ur) => ur.user)
  userRoles: UserRole[];
}
