import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplacementProgram } from '../domain/entity';
import { ReplacementProgramController } from '../controller';
import { ReplacementProgramService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([ReplacementProgram])],
  controllers: [ReplacementProgramController],
  providers: [ReplacementProgramService],  
  exports: [ReplacementProgramService],
})
export class ReplacementProgramModule {}
