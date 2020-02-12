import { Question } from '../entity/question.entity';
import { Game } from 'src/features/game/entity/game.entity';

export class QuestionBuilder {
  private _id: string;
  private _gameId: string;
  private _question: string;
  private _options: string;
  private _answer: string;
  private _game: Game;

  constructor() {}

  build(): Question {
    return new Question(this);
  }

  get id(): string {
    return this._id;
  }

  get gameId(): string {
    return this._gameId;
  }

  get question(): string {
    return this._question;
  }

  get options(): string {
    return this._options;
  }

  get answer(): string {
    return this._answer;
  }

  get game(): Game {
    return this._game;
  }

  setId(value: string): QuestionBuilder {
    this._id = value;
    return this;
  }

  setGameId(value: string): QuestionBuilder {
    this._gameId = value;
    return this;
  }

  setQuestion(value: string): QuestionBuilder {
    this._question = value;
    return this;
  }

  setOptions(value: string): QuestionBuilder {
    this._options = value;
    return this;
  }

  setAnswer(value: string): QuestionBuilder {
    this._answer = value;
    return this;
  }

  setGame(value: Game): QuestionBuilder {
    this._game = value;
    return this;
  }
}
