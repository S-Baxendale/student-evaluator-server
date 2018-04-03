import { JsonController, Post, Body, HttpCode } from "routing-controllers"

import User from './entity'

@JsonController()
export default class TeacherController {

  @Post('/teachers')
  @HttpCode(201)
  async createUser(
    @Body() user: User
  ) {
    const {password, ...rest} = user
    const entity = User.create(rest)
    await entity.setPassword(password)
    return entity.save()
    //return user.save()
  }
}
