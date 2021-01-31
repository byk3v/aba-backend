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
import { ClientService } from '../services';
import { CreateCLientDto } from '../dto/create-client.dto';
import { CLientDto } from '../dto/client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly ClientsService: ClientService) {}

  @Get()
  //@UseGuards(JwtAuthGuard)
  async getAllBehaviorProblems(@Query() query) {
    const code = query.description ? query.code : '';
    const firstName = query.active ? query.firstName : '';
    const lastName = query.isPercent ? query.lastName : '';
    const nickName = query.description ? query.nickName : '';
    const dob = query.active ? query.dob : '';
    const phone = query.isPercent ? query.phone : '';
    const email = query.description ? query.email : '';
    const address = query.active ? query.address : '';
    const city = query.isPercent ? query.city : '';
    const state = query.description ? query.state : '';
    const zipcode = query.active ? query.zipcode : '';
    const gender = query.isPercent ? query.gender : '';
    const race = query.description ? query.race : '';
    const primaryLanguage = query.active ? query.primaryLanguage : '';
    const emergencyContact = query.isPercent ? query.emergencyContact : '';
    const emergencyPhone = query.description ? query.emergencyPhone : '';
    const emergencyEmail = query.active ? query.emergencyEmail : '';
    const notes = query.isPercent ? query.notes : '';
    const socialSecurity = query.description ? query.socialSecurity : '';
    const insurance = query.active ? query.insurance : '';
    const memberNo = query.isPercent ? query.memberNo : '';
    const mmaPlan = query.description ? query.mmaPlan : '';
    const mmaIdNo = query.active ? query.mmaIdNo : '';
    const active = query.isPercent ? query.active : '';

    const data = await this.ClientsService.getClients(
      code, firstName, lastName, nickName, dob, phone, email, address, city, state, zipcode, gender, race, primaryLanguage, emergencyContact, emergencyPhone, emergencyEmail, notes, socialSecurity, insurance, memberNo, mmaPlan, mmaIdNo, active
    );
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get(':id')
  getClients(@Param('id', ParseIntPipe) id: number) {
    return this.ClientsService.getbyId(id);
  }

  @Post()
  createCLient(@Body() Cliente: CreateCLientDto) {
    return this.ClientsService.createClient(Cliente);
  }

  @Put(':id')
  updateClient(@Body() dto: CLientDto, @Param('id') id) {
    return this.ClientsService.editClient(dto, id);
  }

  @Delete(':id')
  deleteClient(@Param('id') id) {
    return this.ClientsService.deleteClient(id);
  }
}
