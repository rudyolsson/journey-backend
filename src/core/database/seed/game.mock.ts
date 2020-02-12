import { Game } from '../../../features/game/entity/company.entity';
import { GameBuilder } from '../../../features/game/builder/company.builder';

export async function createGameMock(
  name: string,
  id: string,
  userId: string
): Promise<Game> {
  const game: Game = await new GameBuilder()
    .setId(id)
    .setUserId(userId)
    .setName(name)
    .build()
    .save();

  console.log('*****************************************');
  console.log(`Game ${name} created with is ${game.id}`);
  return game;
}
