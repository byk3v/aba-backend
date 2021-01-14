import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthController } from './auth.controller';
//import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  /*imports:[
    TypeOrmModule.forFeature([AuthRepository])
],*/
imports: [
  UsuariosModule,
  PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false,
}),
  JwtModule.register({
    secret: /*process.env.SECRETKEY || */'ABA-SecretKey', 
    signOptions: { expiresIn: process.env.EXPIRESIN || '60s',},
}),
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    PassportModule, 
    JwtModule
],
})
export class AuthModule {}
