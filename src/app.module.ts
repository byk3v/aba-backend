import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserModule,
  RoleModule,
  DiagnosisModule,
  BehaviorAnalysisCodesModule,
  BehaviorProblemsModule,
  ReplacementProgramModule,
  ClientsModule,
  CaregiverTypesModule,
  CompetencyCheckParamsModule
} from './modules';
import { AuthModule } from './auth/auth.module';

let connectionOptions;
let optionsSQL;

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  optionsSQL = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'aba-bd',
  entities: [__dirname + './**/**/*entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    UserModule,
    RoleModule,
    AuthModule,
    TypeOrmModule.forRoot(optionsSQL), //connectionOptions o optionsSQL
    DiagnosisModule,
    BehaviorProblemsModule,
    ReplacementProgramModule,
    BehaviorAnalysisCodesModule,
    ClientsModule,
    CaregiverTypesModule,
    CompetencyCheckParamsModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService], //UserService adentro me da bateo
})
export class AppModule {}
