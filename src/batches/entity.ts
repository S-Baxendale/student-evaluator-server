import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { IsDateString } from 'class-validator'

import Student from '../students/entity'

@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  //@IsDateString()
  @Column({nullable: false})
  startDate: Date

  //@IsDateString()
  @Column({nullable: false})
  endDate: Date

  @OneToMany(_ => Student, student => student.batch, {eager:true})
  students: Student[]

}
