import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { IsDate } from 'class-validator'

import Student from '../students/entity'

@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsDate()
  @Column({nullable: false})
  startDate: Date

  @IsDate()
  @Column({nullable: false})
  endDate: Date

  @OneToMany(_ => Student, student => student.batch, {eager:true})
  students: Student[]

}
