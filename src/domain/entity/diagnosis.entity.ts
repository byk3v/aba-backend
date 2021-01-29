import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('diagnosis')
export class Diagnosis {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 8, default: 'ACTIVE' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
