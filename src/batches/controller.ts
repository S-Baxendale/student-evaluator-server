import { JsonController, Get, Post, Param, Body } from 'routing-controllers'

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

  @Post('/batches')
    async createBatch(
      @Body() batch: Batch
    ) {
      const entity  = await Batch.create(batch).save()

      return entity
    }
}
