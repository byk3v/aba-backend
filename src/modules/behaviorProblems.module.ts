import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BehaviorProblem } from '../domain/entity';
import { BehaviorProblemsController } from '../controller';
import { BehaviorProblemsService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([BehaviorProblem])],
  controllers: [BehaviorProblemsController],
  providers: [BehaviorProblemsService],  
  exports: [BehaviorProblemsService],
})
export class BehaviorProblemsModule {}
