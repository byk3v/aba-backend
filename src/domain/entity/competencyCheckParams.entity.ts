import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('competency-check-params')
  export class CompetencyCheckParams {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', nullable: false })
    competencyCheckType: string;

    @Column({ type: 'varchar', length: 250 })
    description: string;
    
    @Column({ type: 'varchar', length: 100 })
    comment: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  }
  