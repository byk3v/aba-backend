import { User } from 'src/domain/entity/';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  description: string;

  @ManyToMany((type) => User, (user) => user.roles)
  @JoinTable({ name: 'user_roles' })
  users: User[];

  @Column({ type: 'varchar', length: 8, default: 'ACTIVE' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
