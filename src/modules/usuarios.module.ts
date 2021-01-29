import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../domain/entity';
import { UsuariosController } from '../controller';
import { UsuariosService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
