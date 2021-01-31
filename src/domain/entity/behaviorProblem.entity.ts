import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('behavior-problem')
export class BehaviorProblem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false, default: 'ACTIVE' })
  active: string;

  @Column({ type: 'varchar', nullable: false })
  isPercent: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
