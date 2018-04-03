import { JsonController, Get, Param } from 'routing-controllers'

import Batch from './entity'

@JsonController()
export default class BatchController {

  @Get('/batches')
    getBatches() {
      return Batch.find()
    }

  @Get('/batches/:id([0-9]+)')
    getBatch(
      @Param('id') id: number
    ) {
      return Batch.findOneById(id)
    }
}
