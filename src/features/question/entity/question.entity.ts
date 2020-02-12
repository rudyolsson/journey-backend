import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { TraceableEntity } from '../../../core/database/traceable.entity';
import { QuestionBuilder } from '../builder/question.builder';
import { Game } from 'src/features/game/entity/game.entity';

@Entity({ name: 't_question' })
export class Question extends TraceableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  question: string;

  @Column()
  options: string;

  @Column({ nullable: false })
  answer: string;

  @Column({ nullable: false })
  gameId: string;

  @ManyToOne(
    type => Game,
    game => game.questions,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({ name: 'gameId' })
  game: Game;

  constructor(questionBuilder: QuestionBuilder) {
    super();
    if (questionBuilder) {
      this.id = questionBuilder.id;
      this.question = questionBuilder.question;
      this.options = questionBuilder.options;
      this.answer = questionBuilder.answer;
      this.game = questionBuilder.game;
    }
  }
}
