import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BehaviorAnalysisCodesService } from '../services';
import { CreateBehaviorAnalysisCodeDto } from '../dto/create-behaviorAnalysisCode.dto';
import { BehaviorAnalysisCodeDto } from '../dto/behaviorAnalysisCodeDto';

@Controller('behavior-analysis-codes')
export class BehaviorAnalysisCodesController {
    constructor(private readonly BehaviorACService: BehaviorAnalysisCodesService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllBehaviorAC(@Query() query) {
      const hcpcs = query.hcpcs ? query.hcpcs : '';
      const description = query.description ? query.description : '';
      const checkable = query.checkable ? query.checkable : '';
      const color = query.color ? query.color : '';

      const data = await this.BehaviorACService.getBehaviorAnalysisCodes(hcpcs, description, checkable, color);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
//hcpcs, description, checkable, color  
    @Get(':id')
    getBehaviorAC(@Param('id', ParseIntPipe) id: number) {
      return this.BehaviorACService.getbyId(id);
    }
  
    @Post()
    createBehaviorAC(@Body() BehaviorAC: CreateBehaviorAnalysisCodeDto) {
      return this.BehaviorACService.createDiagnosis(BehaviorAC);
    }
  
    @Put()
    updateBehaviorAC(@Body() dto: BehaviorAnalysisCodeDto) {
      return this.BehaviorACService.editBehaviorAnalysisCode(dto);
    }
  
    @Delete()
    deleteBehaviorAC(@Body() BehaviorAC: { id: number[] }) {
      return this.BehaviorACService.deleteBehaviorAnalysisCode(BehaviorAC.id);
    }
  }
  