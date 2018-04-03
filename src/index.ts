import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import BatchController from './batches/controller'
import StudentController from './students/controller'

const port = process.env.PORT || 4008

const app = createKoaServer({
  cors: true,
  controllers: [
    BatchController,
    StudentController
  ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))
