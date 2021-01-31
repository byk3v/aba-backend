import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BehaviorAnalysisCodes } from '../domain/entity';
import { BehaviorAnalysisCodesController } from '../controller';
import { BehaviorAnalysisCodesService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([BehaviorAnalysisCodes])],
  controllers: [BehaviorAnalysisCodesController],
  providers: [BehaviorAnalysisCodesService],  
  exports: [BehaviorAnalysisCodesService],
})
export class BehaviorAnalysisCodesModule {}
