import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/auth.types';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { TokenNotFoundException } from '../../core/exceptions/token-not-found.exception';
import { Transactional, Propagation } from 'typeorm-transactional-cls-hooked';
import { SignUpDto } from './dto/signup.dto';
import { UserFoundException } from '../../core/exceptions/user.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async createTokenForUser(payload: JwtPayload) {
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.userService.findByEmail(payload.email);
  }

  public async checkToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new TokenNotFoundException();
    }
  }

  public async isAdmin(token: string): Promise<boolean> {
    try {
      return this.jwtService.verify(token).isAdmin;
    } catch {
      throw new TokenNotFoundException();
    }
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async register({
    email,
    phoneNumber,
    firstName,
    lastName,
    country,
    password
  }: SignUpDto) {
    let user;
    try {
      user = await this.userService.create(
        email.toLowerCase(),
        password,
        false
      );
      // await this.profileService.create(
      //   user,
      //   phoneNumber,
      //   firstName,
      //   lastName,
      //   country,
      // );
    } catch (e) {
      throw new UserFoundException();
    }
    return user;
  }
}
