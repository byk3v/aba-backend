import {HttpException, HttpStatus,Injectable,NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { BehaviorProblem } from '../domain/entity';
  import { CreateProblemBehaviorDto } from '../dto/create-problemBehavior.dto';
  import { ProblemBehaviorDto } from '../dto/problemBehavior.dto';
  import { toBehaviorProblemDto } from '../utils/mapper';

@Injectable()
export class BehaviorProblemsService {
  constructor(
    @InjectRepository(BehaviorProblem)
    private readonly BehaviorProblemRepository: Repository<BehaviorProblem>,
  ) {}

  async getBehaviorProblems(description?: string, active?: string, isPercent?: string,): Promise<BehaviorProblem[]> {
    if ( description && active && isPercent) {
      return await this.BehaviorProblemRepository.find({
        where: { description, active, isPercent},
      });
    } 
    else if ( description || active || isPercent) {
      if (description) return await this.BehaviorProblemRepository.find({ where: { description } });
      if (active) return await this.BehaviorProblemRepository.find({ where: { active } });
      else
        return await this.BehaviorProblemRepository.find({ where: { isPercent } });
    } else return await this.BehaviorProblemRepository.find();
  }

  async getbyId(id: number) {
    const BehaviorProblem = await this.BehaviorProblemRepository.findOne(id);
    if (!BehaviorProblem) throw new NotFoundException(`Behavior Problem doesn't exist`);
    return BehaviorProblem;
  }

  async createBehaviorProblem(dto: CreateProblemBehaviorDto): Promise<ProblemBehaviorDto> {
    const { description, active, isPercent } = dto;

    const behaviorPInDb = await this.BehaviorProblemRepository.findOne({
      where: { description },
    });

    if (behaviorPInDb) {
      throw new HttpException(
        'Behavior Problem already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const behaviorProblem: BehaviorProblem = await this.BehaviorProblemRepository.create({ description, active, isPercent});
    await this.BehaviorProblemRepository.save(behaviorProblem);
    return toBehaviorProblemDto(behaviorProblem);
  }

  async editBehaviorProblem(dto: ProblemBehaviorDto, id: number) {
    const behaviorP = await this.BehaviorProblemRepository.findOne(id);
    console.log(behaviorP);
    if (!behaviorP) throw new NotFoundException(`Behavior Problem doesn't exist`);

    const behaviorUpdated = Object.assign(behaviorP, dto);
    return await this.BehaviorProblemRepository.save(behaviorUpdated);
  }

  async deleteBehaviorProblem(id: number) {
    return await this.BehaviorProblemRepository.delete(id);
  }
}
