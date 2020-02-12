import { EntityRepository, UpdateResult } from 'typeorm';
import { CommonRepository } from '../../../core/database/common.repository';
import { Question } from '../entity/question.entity';
import { QuestionBuilder } from '../builder/question.builder';
import { QuestionDto } from '../dto/question.dto';

@EntityRepository(Question)
export class QuestionRepository extends CommonRepository<Question> {
  public async updateEntity(
    id,
    { question, answer, gameId, options }: QuestionDto
  ): Promise<UpdateResult> {
    const questionToInsert: Question = await new QuestionBuilder()
      .setQuestion(question)
      .setAnswer(answer)
      .setGameId(gameId)
      .setOptions(options)
      .build();

    return await this.update(id, questionToInsert);
  }
}
