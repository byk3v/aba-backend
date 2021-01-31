import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('behavior-analysis-codes')
export class BehaviorAnalysisCodes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  hcpcs: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 8, default: 'ACTIVE' })
  checkable: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
