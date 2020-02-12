import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { Question } from './entity/question.entity';
import { CompanyController } from './question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [CompanyController],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
