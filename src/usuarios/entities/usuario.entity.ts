import { Role } from 'src/role/entities/role.entity';
import * as bcrypt from 'bcrypt';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 8, default: 'ACTIVE' })
  status: string;

  @Column({ default: '' })
  refreshtoken: string;

  @Column({ default: '' })
  refreshtokenExpires: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Role, (rol) => rol.users)
  //@JoinTable({name: 'user_roles'})
  roles: Role[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
