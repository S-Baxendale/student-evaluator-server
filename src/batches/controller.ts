import { JsonController, Get, Post, Param, Body, Authorized } from 'routing-controllers'

import Batch from './entity'

@JsonController()
export default class BatchController {

  @Authorized()
  @Get('/batches')
    getBatches() {
      return Batch.find()
    }

  @Authorized()
  @Get('/batches/:id([0-9]+)')
    getBatch(
      @Param('id') id: number
    ) {
      return Batch.findOneById(id)
    }

  @Authorized()
  @Post('/batches')
    async createBatch(
      @Body() batch: Batch
    ) {
      const entity  = await Batch.create(batch).save()

      return entity
    }
}
