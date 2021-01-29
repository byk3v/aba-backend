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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DiagnosisService } from '../services';
import { CreateDiagnosisDto } from '../dto/create-diagnosis.dto';
import { DiagnosisDto } from '../dto/diagnosisDto';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly DiagnosisService: DiagnosisService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllDiagnosis(@Query() query) {
    const code = query.code ? query.code : '';
    const description = query.description ? query.description : '';
    const data = await this.DiagnosisService.getDiagnosis(code, description);
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get(':id')
  getDiagnosis(@Param('id', ParseIntPipe) id: number) {
    return this.DiagnosisService.getbyId(id);
  }

  @Post()
  crearDiagnosis(@Body() diagnosis: CreateDiagnosisDto) {
    return this.DiagnosisService.createDiagnosis(diagnosis);
  }

  @Put()
  modificarDiagnosis(@Body() dto: DiagnosisDto) {
    return this.DiagnosisService.editDiagnosis(dto);
  }

  @Delete()
  eliminarDiagnosis(@Body() diagnosis: { id: number[] }) {
    return this.DiagnosisService.deleteDiagnosis(diagnosis.id);
  }
}
