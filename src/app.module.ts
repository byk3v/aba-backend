import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuariosModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'aba-bd',
    entities: [__dirname + './**/**/*entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
  }), RoleModule, AuthModule
],
  controllers: [AppController, UsuariosController],
  providers: [AppService], //UsuariosService adentro me da bateo
})
export class AppModule {}
