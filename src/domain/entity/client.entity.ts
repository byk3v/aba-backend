import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,} from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', length: 80, nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false , default: 'ACTIVE' })
  active: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
