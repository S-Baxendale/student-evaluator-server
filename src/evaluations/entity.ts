import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsString, IsDateString } from 'class-validator'

import Teacher from '../teachers/entity'
import Student from '../students/entity'

@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsDateString()
  @Column()
  date: Date
  // Create Date Column in TypeORM?
  // Set Default date?

  @IsString()
  @Column('text')
  color: string
  // Color code?

  @IsString()
  @Column('text')
  remark: string

  @ManyToOne(_ => Teacher, teacher => teacher.evaluations)
  teacher: Teacher

  @ManyToOne(_ => Student, student => student.evaluations)
  student: Student

}
