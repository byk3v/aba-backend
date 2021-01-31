import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaregiversType } from '../domain/entity';
import { CaregiverTypesController } from '../controller';
import { CaregiverTypeService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([CaregiversType])],
  controllers: [CaregiverTypesController],
  providers: [CaregiverTypeService],  
  exports: [CaregiverTypeService],
})
export class CaregiverTypesModule {}
