import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../domain/entity';
import { RoleController } from '../controller';
import { RoleService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
