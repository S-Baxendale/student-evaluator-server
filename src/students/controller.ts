import { JsonController, Get, Param, Delete, Patch, Body, NotFoundError } from 'routing-controllers'
import Student from './entity'


@JsonController()
export default class StudentController {

  //Get All Students:
  @Get('/students')
    getStudents() {
      return Student.find()
    }

  //Get Student by ID:
  @Get('/students/:id([0-9]+)')
    getStudent(
      @Param('id') id: number
    ) {
      return Student.findOneById(id)
    }

  //Edit Student by ID:
  @Patch('/students/:id([0-9]+)')
  async editStudent(
    @Param('id') id: number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOneById(id)
    if(!student) throw new NotFoundError('Cannot find student')
    return Student.merge(student, update).save()
  }

  //Remove Student:
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
