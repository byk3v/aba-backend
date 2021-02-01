import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetencyCheckParams } from '../domain/entity';
import { CompetencyCheckParamsController } from '../controller';
import { CompetencyCheckParamsService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([CompetencyCheckParams])],
  controllers: [CompetencyCheckParamsController],
  providers: [CompetencyCheckParamsService],  
  exports: [CompetencyCheckParamsService],
})
export class CompetencyCheckParamsModule {}
