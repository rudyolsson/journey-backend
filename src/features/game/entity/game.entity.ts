import {
  Column,
  Entity,
  JoinColumn,
  Unique,
  PrimaryColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { TraceableEntity } from '../../../core/database/traceable.entity';
import { User } from '../../user/entity/user.entity';
import { GameBuilder } from '../builder/game.builder';
import { Question } from 'src/features/question/entity/question.entity';

@Entity({ name: 't_game' })
export class Game extends TraceableEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column()
  name: string;

  @ManyToOne(
    type => User,
    user => user.games,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(
    type => Question,
    question => question.game
  )
  questions: Question[];

  constructor(gameBuilder: GameBuilder) {
    super();
    if (gameBuilder) {
      this.id = gameBuilder.id;
      this.userId = gameBuilder.userId;
      this.user = gameBuilder.user;
      this.name = gameBuilder.name;
    }
  }
}
