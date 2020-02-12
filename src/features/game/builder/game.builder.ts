import { Game } from '../entity/game.entity';
import { User } from '../../user/entity/user.entity';

export class GameBuilder {
  private _id: string;
  private _user: User;
  private _userId: string;
  private _name: string;

  constructor() {}

  build(): Game {
    return new Game(this);
  }

  public get id(): string {
    return this._id;
  }

  public get user(): User {
    return this._user;
  }

  public get userId(): string {
    return this._userId;
  }

  public get name(): string {
    return this._name;
  }

  public setId(value: string): GameBuilder {
    this._id = value;
    return this;
  }

  public setUser(value: User): GameBuilder {
    this._user = value;
    return this;
  }

  public setUserId(value: string): GameBuilder {
    this._userId = value;
    return this;
  }

  public setName(value: string): GameBuilder {
    this._name = value;
    return this;
  }
}
