import { IsNotEmpty } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  question: string;
  @IsNotEmpty()
  answer: string;
  @IsNotEmpty()
  gameId: string;
  options: string;
}
