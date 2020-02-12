import { Injectable } from '@nestjs/common';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { Question } from './entity/question.entity';
import { QuestionRepository } from './repository/question.repository';
import { getCustomRepository, UpdateResult } from 'typeorm';
import { QuestionBuilder } from './builder/question.builder';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor() {}

  @Transactional({ propagation: Propagation.MANDATORY })
  public async findById(
    id: string,
    select: string[],
    relation: string[] = []
  ): Promise<Question> {
    const questionRepository: QuestionRepository = getCustomRepository(
      QuestionRepository
    );
    const question: Question = await questionRepository.findById(
      id,
      select,
      relation
    );
    return question;
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async findByName(
    name: string,
    select: string[],
    relation: string[] = []
  ): Promise<Question> {
    const questionRepository: QuestionRepository = getCustomRepository(
      QuestionRepository
    );
    const question: Question = await questionRepository.findByName(
      name,
      select,
      relation
    );
    return question;
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async create(questionReq: Question): Promise<Question> {
    const questionRepository: QuestionRepository = getCustomRepository(
      QuestionRepository
    );
    const { question, answer, gameId, options } = questionReq;
    const questionToInsert: Question = await new QuestionBuilder()
      .setQuestion(question)
      .setAnswer(answer)
      .setGameId(gameId)
      .setOptions(options)
      .build();

    return await questionRepository.save(questionToInsert);
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async update(
    id: string,
    questionDto: QuestionDto
  ): Promise<UpdateResult> {
    const questionRepository: QuestionRepository = getCustomRepository(
      QuestionRepository
    );
    return await questionRepository.updateEntity(id, questionDto);
  }
}
