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
import { CaregiverTypeService } from '../services';
import { CreateCaregiverTypeDto } from '../dto/create-caregiverType.dto';
import { CaregiverTypeDto } from '../dto/caregiverType.dto';

@Controller('caregiverTypes')
export class CaregiverTypesController {
  constructor(private readonly CaregiversTService: CaregiverTypeService) {}

  @Get()
  //@UseGuards(JwtAuthGuard)
  async getAllCaregiverTypes(@Query() query) {
    const description = query.description ? query.description : '';
    
    const data = await this.CaregiversTService.getCaregiversType(
      description
    );
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get(':id')
  getCaregiverType(@Param('id', ParseIntPipe) id: number) {
    return this.CaregiversTService.getbyId(id);
  }

  @Post()
  createCaregiverType(@Body() caregiverT: CreateCaregiverTypeDto) {
    return this.CaregiversTService.createCaregiverType(caregiverT);
  }

  @Put(':id')
  updateCaregiverType(@Body() dto: CaregiverTypeDto, @Param('id') id) {
    return this.CaregiversTService.editCaregiverType(dto, id);
  }

  @Delete(':id')
  deleteCaregiverType(@Param('id') id) {
    return this.CaregiversTService.deleteCaregiverTypes(id);
  }
}
