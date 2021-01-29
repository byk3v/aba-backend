import { EntityRepository, Repository } from 'typeorm';
import { Diagnosis } from '../entity/diagnosis.entity';

@EntityRepository(Diagnosis)
export class DiagnosisRepository extends Repository<Diagnosis> {}
