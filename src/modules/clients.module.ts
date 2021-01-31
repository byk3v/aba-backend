import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../domain/entity';
import { ClientsController } from '../controller';
import { ClientService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientService],  
  exports: [ClientService],
})
export class ClientsModule {}
