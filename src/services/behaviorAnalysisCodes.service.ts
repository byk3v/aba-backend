import {HttpException, HttpStatus,Injectable,NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { BehaviorAnalysisCodes } from '../domain/entity';
  import { CreateBehaviorAnalysisCodeDto } from '../dto/create-behaviorAnalysisCode.dto';
  import { BehaviorAnalysisCodeDto } from '../dto/behaviorAnalysisCodeDto';
  import { toBehaviorAnalysisCodesDto } from '../utils/mapper';
import { SetActiveDto } from "../dto/set-active.dto";

@Injectable()
export class BehaviorAnalysisCodesService {
  constructor(
    @InjectRepository(BehaviorAnalysisCodes)
    private readonly BehaviorAnalysisCodesRepository: Repository<BehaviorAnalysisCodes>,
  ) {}

  async getBehaviorAnalysisCodes(hcpcs?: string, description?: string, checkable?: string, color?: string,): Promise<BehaviorAnalysisCodes[]> {
    if (hcpcs && description && checkable && color) {
      return await this.BehaviorAnalysisCodesRepository.find({
        where: { hcpcs, description, checkable, color},
      });
    } 
    else if (hcpcs || description || checkable || color) {
      if (hcpcs) return await this.BehaviorAnalysisCodesRepository.find({ where: { hcpcs } });
      if (checkable) return await this.BehaviorAnalysisCodesRepository.find({ where: { checkable } });
      if (color) return await this.BehaviorAnalysisCodesRepository.find({ where: { color } });
      else
        return await this.BehaviorAnalysisCodesRepository.find({ where: { description } });
    } else return await this.BehaviorAnalysisCodesRepository.find();
  }

  async getbyId(id: number) {
    const BehaviorAC = await this.BehaviorAnalysisCodesRepository.findOne(id);
    if (!BehaviorAC) throw new NotFoundException(`Diagnosis doesn't exist`);
    return BehaviorAC;
  }

  async createDiagnosis(dto: CreateBehaviorAnalysisCodeDto): Promise<BehaviorAnalysisCodeDto> {
    const { hcpcs, description, color } = dto;

    const behaviorACInDb = await this.BehaviorAnalysisCodesRepository.findOne({
      where: { hcpcs },
    });

    if (behaviorACInDb) {
      throw new HttpException(
        'Behavior Analysis Code already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const behaviorAC: BehaviorAnalysisCodes = await this.BehaviorAnalysisCodesRepository.create({hcpcs, description, color});
    await this.BehaviorAnalysisCodesRepository.save(behaviorAC);
    return toBehaviorAnalysisCodesDto(behaviorAC);
  }

  async setActive(dataActive:SetActiveDto) {
    const { id, active } = dataActive;
    return await this.BehaviorAnalysisCodesRepository.update(id, { active:active });
  }

  async editBehaviorAnalysisCode(dto: BehaviorAnalysisCodeDto) {
    const behaviorAC = await this.BehaviorAnalysisCodesRepository.findOne(dto.id);
    if (!behaviorAC) throw new NotFoundException(`Behavior Analysis Code doesn't exist`);

    const behaviorUpdated = Object.assign(behaviorAC, dto);
    return await this.BehaviorAnalysisCodesRepository.save(behaviorUpdated);
  }

  async deleteBehaviorAnalysisCode(ids: number[]) {
    return await this.BehaviorAnalysisCodesRepository.delete(ids);
  }
}
