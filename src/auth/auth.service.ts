import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../services';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-usuario.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginUserDto } from 'src/dto/loginUserDto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { UserDto } from 'src/dto/userDto';
import { RoleService } from '../services';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const randtoken = require('rand-token');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.usersService.createUser(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    console.log(user);

    // generate and sign token
    const token = this._createToken(user);
    const refreshToken = await this._generateRefreshToken(user);
    console.log('token', token);
    console.log('refreshToken', refreshToken);

    const roles = await this.roleService.findRolesbyUser(user.id);

    console.log(roles);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    return {
      username: user.username,
      ...token,
      ...refreshToken,
      currentAuthority: roles[0].name, // Temporal, hasta definirse el manejo de roles en el frontend
    };
  }

  async refresh(usuarioDto: UserDto): Promise<any> {
    // generate and sign token
    const token = this._createToken(usuarioDto);
    const refreshToken = await this._generateRefreshToken(usuarioDto);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    return {
      ...usuarioDto,
      ...token,
      ...refreshToken,
      status: 201,
    };
  }

  private async _generateRefreshToken({ username, id }: UserDto): Promise<any> {
    const refreshToken = randtoken.generate(16);
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 1); // 1 día
    // let expiresIn = process.env.EXPIRESIN || "5m";
    await this.usersService.saveUpdateRefreshToken(refreshToken, id, expiresIn);
    return {
      refreshTokenExpires: expiresIn,
      refreshToken,
    };
  }

  private _createToken({ username, id }: UserDto): any {
    const user: JwtPayload = { username, id };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN || '60s',
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
