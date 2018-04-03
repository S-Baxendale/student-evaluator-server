import 'reflect-metadata'
import {createKoaServer, Action, BadRequestError} from "routing-controllers"
import setupDb from './db'

import BatchController from './batches/controller'
import StudentController from './students/controller'
import TeacherController from './teachers/controller'
import LoginsController from './logins/controller'
import EvaluationController from './evaluations/controller'

import Teacher from './teachers/entity'

import { verify } from './jwt'

const port = process.env.PORT || 4008

const app = createKoaServer({
  cors: true,
  controllers: [
    BatchController,
    StudentController,
    TeacherController,
    LoginsController,
    EvaluationController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      if (token) {
        const {id} = verify(token)
        return Teacher.findOneById(id)
      }
    }
    return undefined
  }

})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))
