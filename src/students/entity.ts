import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { IsString } from 'class-validator';

import Evaluation from '../evaluations/entity'
import Batch from '../batches/entity'

@Entity()
export default class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  firstName: string

  @IsString()
  @Column('text')
  lastName: string

  @IsString()
  @Column('text')
  photo: string

  @ManyToOne(_ => Batch, batch => batch.students)
  batch: Batch

  @OneToMany(_ => Evaluation, evaluation => evaluation.student, {eager:true})
  evaluations: Evaluation[]

}
