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
  import { CompetencyCheckParamsService } from '../services';
  import { CreateCompetencyCheckParamsDto } from '../dto/create-competencyCheckParams.dto';
  import { CompetencyCheckParamsDto } from '../dto/competencyCheckParams.dto';
  
  @Controller('competencyCheckParams')
  export class CompetencyCheckParamsController {
    constructor(private readonly CompetencyCPService: CompetencyCheckParamsService) {}
  
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getCompetencyCheckParams(@Query() query) {
      const competencyCheckType = query.description ? query.competencyCheckType : '';
      const description = query.active ? query.description : '';
      const comment = query.isPercent ? query.comment : '';
      
      const data = await this.CompetencyCPService.getCompetencyCheckParams(
        competencyCheckType,
        description,
        comment
      );
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getCompetencyCheckParam(@Param('id') id: string) {
      return this.CompetencyCPService.getbyId(id);
    }
  
    @Post()
    createCompetencyCheckParams(@Body() ccp: CreateCompetencyCheckParamsDto) {
      return this.CompetencyCPService.createCompetencyCheckParams(ccp);
    }
  
    @Put(':id')
    updateCompetencyCheckParams(@Body() dto: CompetencyCheckParamsDto, @Param('id') id) {
      return this.CompetencyCPService.editCompetencyCheckParams(dto, id);
    }
  
    @Delete(':id')
    deleteCompetencyCheckParams(@Param('id') id) {
      return this.CompetencyCPService.deleteCompetencyCheckParams(id);
    }
  }
  