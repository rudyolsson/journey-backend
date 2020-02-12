import { EntityRepository } from 'typeorm';
import { CommonRepository } from '../../../core/database/common.repository';
import { Game } from '../entity/game.entity';

@EntityRepository(Game)
export class GameRepository extends CommonRepository<Game> {
  public async findByUserId(
    userId: string,
    select: string[],
    relations: string[] = []
  ): Promise<Game> {
    return this.findOne({
      relations,
      select: select as any[],
      where: {
        userId
      }
    });
  }
}
