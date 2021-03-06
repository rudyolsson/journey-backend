import { Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { getCustomRepository } from 'typeorm';
import { CryptoUtils } from '../../core/lib/utils/crypto.utils';

@Injectable()
export class UserService {
  constructor() {}

  @Transactional({ propagation: Propagation.MANDATORY })
  public async findById(
    id: string,
    relations: string[] = [],
    select: string[] = []
  ): Promise<User> {
    return await getCustomRepository(UserRepository).findById(
      id,
      relations,
      select
    );
  }

  public async findByEmail(
    email: string,
    relations: string[] = []
  ): Promise<User> {
    return await getCustomRepository(UserRepository).findByEmail(
      email,
      relations
    );
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async create(
    email: string,
    password: string,
    isActive: boolean
  ): Promise<User> {
    return await getCustomRepository(UserRepository).saveEntity(
      email,
      password,
      isActive
    );
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async setActive(user: User): Promise<void> {
    await getCustomRepository(UserRepository).setActive(user);
  }

  public async isUserInvalid(user: User, password: string): Promise<boolean> {
    return (
      !user ||
      !user.isActive ||
      !(await CryptoUtils.compareHash(password, user.password))
    );
  }
}
