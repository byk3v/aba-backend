import {HttpException, HttpStatus,Injectable,NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { CompetencyCheckParams } from '../domain/entity';
  import { CreateCompetencyCheckParamsDto } from '../dto/create-competencyCheckParams.dto';
  import { CompetencyCheckParamsDto } from '../dto/competencyCheckParams.dto';
  import { toCompetencyCheckParamDto } from '../utils/mapper';

@Injectable()
export class CompetencyCheckParamsService {
  constructor(
    @InjectRepository(CompetencyCheckParams)
    private readonly CompetencyCheckParamsRepository: Repository<CompetencyCheckParams>,
  ) {}

  async getCompetencyCheckParams(competencyCheckType?: string, description?: string, comment?: string): Promise<CompetencyCheckParams[]> {
    if ( description && competencyCheckType && comment ){
        return await this.CompetencyCheckParamsRepository.find({
          where: { description, competencyCheckType, comment},
        });
      } 
      else if ( description || competencyCheckType || comment) {
        if (description) return await this.CompetencyCheckParamsRepository.find({ where: { description } });
        if (competencyCheckType) return await this.CompetencyCheckParamsRepository.find({ where: { competencyCheckType } });
        else
          return await this.CompetencyCheckParamsRepository.find({ where: { comment } });
      } else return await this.CompetencyCheckParamsRepository.find();
    }

  async getbyId(id: string) {
    const CompetencyCP = await this.CompetencyCheckParamsRepository.findOne(id);
    if (!CompetencyCP) throw new NotFoundException(`Competency Check Param  doesn't exist`);
    return CompetencyCP;
  }

  async createCompetencyCheckParams(dto: CreateCompetencyCheckParamsDto): Promise<CompetencyCheckParamsDto> {
    const { competencyCheckType, description, comment } = dto;

    const CompetencyCPInDb = await this.CompetencyCheckParamsRepository.findOne({
      where: { description },
    });

    if (CompetencyCPInDb) {
      throw new HttpException(
        'Competency Check Param already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const competencyCP: CompetencyCheckParams = await this.CompetencyCheckParamsRepository.create({ competencyCheckType, description, comment});
    await this.CompetencyCheckParamsRepository.save(competencyCP);
    return toCompetencyCheckParamDto(competencyCP);
  }

  async editCompetencyCheckParams(dto: CompetencyCheckParamsDto, id: string) {
    const competencyCP = await this.CompetencyCheckParamsRepository.findOne(id);
    if (!competencyCP) throw new NotFoundException(`Competency Check Param doesn't exist`);

    const competencyCPUpdated = Object.assign(competencyCP, dto);
    return await this.CompetencyCheckParamsRepository.save(competencyCPUpdated);
  }

  async deleteCompetencyCheckParams(id: string) {
    return await this.CompetencyCheckParamsRepository.delete(id);
  }
}
