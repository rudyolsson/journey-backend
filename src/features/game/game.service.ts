import { Injectable } from '@nestjs/common';
import { Game } from './entity/game.entity';
import { GameRepository } from './respository/game.repository';
import { GameBuilder } from './builder/game.builder';
import { getCustomRepository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  constructor() {}

  public async get(gameId: string): Promise<Game> {
    const gameRepository: GameRepository = getCustomRepository(GameRepository);

    return await gameRepository.findById(gameId, ['id', 'userId'], ['user']);
  }

  public async create(user: User): Promise<Game> {
    const gameRepository: GameRepository = getCustomRepository(GameRepository);
    const game: Game = new GameBuilder()
      .setUser(user)
      .setUserId(user.id)
      .build();

    return await gameRepository.save(game);
  }

  public async update(game: GameDto): Promise<void> {
    const gameRepository: GameRepository = getCustomRepository(GameRepository);
    await gameRepository.update(game.id, game);
  }
}
