import { JsonController, Get, Post, Param, Delete, Put, Body, NotFoundError, Authorized } from 'routing-controllers'
//import * as request from 'superagent'
import Student from './entity'
import Batch from '../batches/entity'

@JsonController()
export default class StudentController {

  //Create New Student:
  @Authorized()
  @Post('/batches/:id([0-9]+)/students')
  async createStudent(
    @Param('id') id: number,
    @Body() student: Student
  ) {
    const batch = await Batch.findOneById(id)

    const entity = await Student.create({
      batch,
      ...student
    }).save()

    return entity

  }

  //Get All Students:
  @Authorized()
  @Get('/students')
  async getStudents() {
      return Student.find()
    }

  //Get Student by ID:
  @Authorized()
  @Get('/students/:id([0-9]+)')
    getStudent(
      @Param('id') id: number
    ) {
      return Student.findOneById(id, {relations: ["batch"]})
    }

  //Edit Student by ID:
  @Authorized()
  @Put('/students/:id([0-9]+)')
  async editStudent(
    @Param('id') id: number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOneById(id)
    if(!student) throw new NotFoundError('Cannot find student')
    return Student.merge(student, update).save()
  }

  //Remove Student:
  @Authorized()
  @Delete('/students/:id([0-9]+)')
  async deleteStudent(
    @Param('id') id: number
  ) {
    await Student.removeById(id)
    return {
      message: "Student deleted sucessfully"
    }
  }


}
