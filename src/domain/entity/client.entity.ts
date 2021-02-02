import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 30 })
  nickName: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  dob: Date;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  zipcode: string;

  @Column({ type: 'varchar', length: 15 })
  gender: string;

  @Column({ type: 'varchar', length: 60 })
  race: string;

  @Column({ type: 'varchar', length: 20 })
  primaryLanguage: string;

  @Column({ type: 'varchar', length: 150 })
  emergencyContact: string;

  @Column({ type: 'varchar', length: 15 })
  emergencyPhone: string;

  @Column({ type: 'varchar', length: 60 })
  emergencyEmail: string;

  @Column({ type: 'varchar' })
  notes: string;

  @Column({ type: 'varchar', length: 11 })
  socialSecurity: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  insurance: string;

  @Column({ type: 'varchar', length: 50 })
  memberNo: string;

  @Column({ type: 'varchar', length: 50 })
  mmaPlan: string;

  @Column({ type: 'varchar', length: 50 })
  mmaIdNo: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
}
