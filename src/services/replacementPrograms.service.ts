import {HttpException, HttpStatus,Injectable,NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { ReplacementProgram } from '../domain/entity';
  import { CreateReplacementProgramDto } from '../dto/create-replacementPrograms.dto';
  import { ReplacementProgramDto } from '../dto/replacementPrograms.dto';
  import { toReplacementProgramDto } from '../utils/mapper';

@Injectable()
export class ReplacementProgramService {
  constructor(
    @InjectRepository(ReplacementProgram)
    private readonly ReplacementProgramRepository: Repository<ReplacementProgram>,
  ) {}

  async getReplacementProgram(description?: string, active?: string): Promise<ReplacementProgram[]> {
    if (description && active) {
      return await this.ReplacementProgramRepository.find({
        where: { description, active},
      });
    } 
    else if (description || active) {
      if (active) return await this.ReplacementProgramRepository.find({ where: { active } });
      else
        return await this.ReplacementProgramRepository.find({ where: { description } });
    } else return await this.ReplacementProgramRepository.find();
  }

  async getbyId(id: number) {
    const replacemetnP = await this.ReplacementProgramRepository.findOne(id);
    if (!replacemetnP) throw new NotFoundException(`Replacement Program doesn't exist`);
    return replacemetnP;
  }

  async createReplacementPrograms(dto: CreateReplacementProgramDto): Promise<ReplacementProgramDto> {
    const { description, active } = dto;

    const replacementPInDb = await this.ReplacementProgramRepository.findOne({
      where: { description },
    });

    if (replacementPInDb) {
      throw new HttpException(
        'Behavior Analysis Code already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const replaceP: ReplacementProgram = await this.ReplacementProgramRepository.create({description, active});
    await this.ReplacementProgramRepository.save(replaceP);
    return toReplacementProgramDto(replaceP);
  }

  async editReplacementProgram(dto: ReplacementProgramDto) {
    const replaceP = await this.ReplacementProgramRepository.findOne(dto.id);
    if (!replaceP) throw new NotFoundException(`Replacement Program doesn't exist`);

    const replacementUpdated = Object.assign(replaceP, dto);
    return await this.ReplacementProgramRepository.save(replacementUpdated);
  }

  async deleteReplacementProgram(ids: number[]) {
    return await this.ReplacementProgramRepository.delete(ids);
  }
}
