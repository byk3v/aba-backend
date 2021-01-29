import { Module } from '@nestjs/common';
import { DiagnosisController } from '../controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosis } from '../domain/entity';
import { DiagnosisService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnosis])],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
  exports: [DiagnosisService],
})
export class DiagnosisModule {}
