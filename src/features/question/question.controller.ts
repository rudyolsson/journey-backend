import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { Roles } from '../auth/decorator/roles.decorator';
import { UpdateResult } from 'typeorm';
import { Question } from './entity/question.entity';
import { QuestionDto } from './dto/question.dto';
import { QuestionService } from './question.service';

@Controller('/question')
export class CompanyController {
  constructor(private companyService: QuestionService) {}

  @Get()
  //   @Roles('admin')
  @Transactional({ propagation: Propagation.REQUIRES_NEW })
  async findOne(@Request() req): Promise<Question> {
    return await this.companyService.findById(req.user.companyId, ['name']);
  }

  @Post()
  //   @Roles('admin')
  @Transactional({ propagation: Propagation.REQUIRES_NEW })
  async update(
    @Request() req,
    @Body() companyDto: QuestionDto
  ): Promise<UpdateResult> {
    return await this.companyService.update(req.user.companyId, companyDto);
  }
}
