import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('replacement-program')
export class ReplacementProgram {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false, default: 'ACTIVE' })
  active: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
