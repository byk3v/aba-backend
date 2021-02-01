import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BehaviorProblemsService } from '../services';
import { CreateProblemBehaviorDto } from '../dto/create-problemBehavior.dto';
import { ProblemBehaviorDto } from '../dto/problemBehavior.dto';
import { SetActiveDto } from "../dto/set-active.dto";

@Controller('behavior-problems')
export class BehaviorProblemsController {
  constructor(private readonly BehaviorPService: BehaviorProblemsService) {}

  @Get()
  //@UseGuards(JwtAuthGuard)
  async getAllBehaviorProblems(@Query() query) {
    const description = query.description ? query.description : '';
    const active = query.active ? query.active : '';
    const isPercent = query.isPercent ? query.isPercent : '';

    const data = await this.BehaviorPService.getBehaviorProblems(
      description,
      active,
      isPercent,
    );
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get(':id')
  getBehaviorP(@Param('id', ParseIntPipe) id: number) {
    return this.BehaviorPService.getbyId(id);
  }

  @Post()
  createBehaviorP(@Body() BehaviorAC: CreateProblemBehaviorDto) {
    return this.BehaviorPService.createBehaviorProblem(BehaviorAC);
  }

  @Post('setActive')
  setActive(@Body() dataActive: SetActiveDto) {
    return this.BehaviorPService.setActive(dataActive);
  }

  @Put()
  updateBehaviorP(@Body() dto: ProblemBehaviorDto, @Param('id') id) {
    return this.BehaviorPService.editBehaviorProblem(dto, id);
  }

  @Delete()
  deleteBehaviorP(@Body() diagnosis: { id: number[] }) {
    return this.BehaviorPService.deleteBehaviorProblem(diagnosis.id);
  }
}
