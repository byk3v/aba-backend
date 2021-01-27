import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { DiagnosisDto } from './dto/diagnosisDto';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly DiagnosisService: DiagnosisService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllDiagnosis() {
    const data = await this.DiagnosisService.getDiagnosis();
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

  @Put(':id')
  modificarDiagnosis(@Body() diagnosis: CreateDiagnosisDto, @Param('id') id) {
    return this.DiagnosisService.editDiagnosis(id, diagnosis);
  }

  @Delete()
  eliminarDiagnosis(@Body() diagnosis: { id: number[] }) {
    return this.DiagnosisService.deleteDiagnosis(diagnosis.id);
  }
}
