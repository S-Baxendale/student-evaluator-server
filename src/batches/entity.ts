import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { IsDate } from 'class-validator'

import Student from '../students/entity'

@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsDate()
  @Column()
  startDate: Date

  @IsDate()
  @Column()
  endDate: Date

  @OneToMany(_ => Student, student => student.batch)
  students: Student[]

}
