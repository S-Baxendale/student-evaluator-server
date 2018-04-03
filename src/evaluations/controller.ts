import { JsonController, CurrentUser, Get, Post, Param, Delete, Patch, Body, NotFoundError } from 'routing-controllers'

import Student from '../students/entity'
import Teacher from '../teachers/entity'
import Evaluation from './entity'

@JsonController()
export default class EvaluationController {

  //Create New Evaluation:
  @Post('/evaluations/students/:id([0-9]+)')
  async createEvaluation(
    @Param('id') id: number,
    @Body() evaluation: Evaluation,
    @CurrentUser() teacher: Teacher
  ) {
    const student = await Student.findOneById(id)


    const entity = await Evaluation.create({
      student,
      teacher,
      ...evaluation
    }).save()
    console.log(teacher)

    return entity

  }


}
