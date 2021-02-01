import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnosis } from '../domain/entity';
import { CreateDiagnosisDto } from '../dto/create-diagnosis.dto';
import { DiagnosisDto } from '../dto/diagnosisDto';
import { toDiagnosisDto } from '../utils/mapper';
import { SetActiveDto } from "../dto/set-active.dto";

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private readonly DiagnosisRepository: Repository<Diagnosis>,
  ) {}

  async getDiagnosis(
    code?: number[],
    description?: string,
  ): Promise<Diagnosis[]> {
    if (code && description) {
      return await this.DiagnosisRepository.find({
        where: { code, description },
      });
    } else if (code || description) {
      if (code) return await this.DiagnosisRepository.find({ where: { code } });
      else
        return await this.DiagnosisRepository.find({ where: { description } });
    } else return await this.DiagnosisRepository.find();
  }

  async getbyId(id: number) {
    const diagnosis = await this.DiagnosisRepository.findOne(id);
    if (!diagnosis) throw new NotFoundException(`Diagnosis doesn't exist`);
    return diagnosis;
  }

  async createDiagnosis(dto: CreateDiagnosisDto): Promise<DiagnosisDto> {
    const { code, description } = dto;

    const diagnosisInDb = await this.DiagnosisRepository.findOne({
      where: { code },
    });

    if (diagnosisInDb) {
      throw new HttpException(
        'Diagnosis already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const diagnosis: Diagnosis = await this.DiagnosisRepository.create({
      code,
      description,
    });
    await this.DiagnosisRepository.save(diagnosis);
    return toDiagnosisDto(diagnosis);
  }

  async setActive(dataActive:SetActiveDto) {
    const { id, active } = dataActive;
    return await this.DiagnosisRepository.update(id, { active:active });
  }

  async editDiagnosis(dto: DiagnosisDto) {
    const diagnosis = await this.DiagnosisRepository.findOne(dto.id);
    if (!diagnosis) throw new NotFoundException(`Diagnosis doesn't exist`);

    const diagnosisUpdated = Object.assign(diagnosis, dto);
    return await this.DiagnosisRepository.save(diagnosisUpdated);
  }

  async deleteDiagnosis(ids: number[]) {
    return await this.DiagnosisRepository.delete(ids);
  }
}
