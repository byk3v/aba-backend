import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { RoleService } from './role/role.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { RoleController } from './role/role.controller';
import { DiagnosisModule } from './master-tables/diagnosis/diagnosis.module';

let connectionOptions;
connectionOptions = {
  type: 'postgres',
  entities: [__dirname + './**/**/*entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  extra: {
    ssl: true,
  },
};
if (process.env.DATABASE_URL) {
  Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
} else {
  connectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'aba-bd',
    entities: [__dirname + './**/**/*entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
  };
}

@Module({
  imports: [
    UsuariosModule,
    RoleModule,
    AuthModule,
    TypeOrmModule.forRoot(connectionOptions),
    DiagnosisModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService], //UsuariosService adentro me da bateo
})
export class AppModule {}
