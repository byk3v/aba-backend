import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('caregivers-type')
export class CaregiversType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
