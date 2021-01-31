import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReplacementProgramService } from '../services';
import { CreateReplacementProgramDto } from '../dto/create-replacementPrograms.dto';
import { ReplacementProgramDto } from '../dto/replacementPrograms.dto';

@Controller('replacement-programs')
export class ReplacementProgramController {
    constructor(private readonly replacementsService: ReplacementProgramService) {}

    @Get()
    //@UseGuards(JwtAuthGuard)
    async getAllReplacementPrograms(@Query() query) {
      const description = query.description ? query.description : '';
      const active = query.active ? query.active : '';

      const data = await this.replacementsService.getReplacementProgram(description, active);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getReplacementProgram(@Param('id', ParseIntPipe) id: number) {
      return this.replacementsService.getbyId(id);
    }
  
    @Post()
    createReplacementProgram(@Body() ReplacementP: CreateReplacementProgramDto) {
      return this.replacementsService.createReplacementPrograms(ReplacementP);
    }
  
    @Put()
    updateReplacementProgram(@Body() dto: ReplacementProgramDto) {
      return this.replacementsService.editReplacementProgram(dto);
    }
  
    @Delete()
    deleteReplacementProgram(@Body() ReplacementPr: { id: number[] }) {
      return this.replacementsService.deleteReplacementProgram(ReplacementPr.id);
    }
  }
  