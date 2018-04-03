import { JsonController, CurrentUser, Get, Post, Param, Delete, Put, Body, NotFoundError } from 'routing-controllers'

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

    return entity

    // Need to Limit to one per day.

  }

  //Edit Evaluation:
  @Put('/evaluations/:id([0-9]+)')
  async updateEvaluation(
    @Param('id') id: number,
    @Body() update: Partial<Evaluation>
  ) {
    const evaluation = await Evaluation.findOneById(id)
    if(!evaluation) throw new NotFoundError('Cannot find evaluation')

    return Evaluation.merge(evaluation, update).save()
  }

  //Get Evaluations for specific Student:
  @Get('/evaluations/students/:id([0-9]+)')
  async getEvaluations(
    @Param('id') id: number
  ) {
    const student = await Student.findOneById(id)

    return
  }

}
