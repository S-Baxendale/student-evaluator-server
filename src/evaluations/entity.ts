import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsString, IsDate } from 'class-validator'
import Teacher from '../teachers/entity'
import Student from '../students/entity'

@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsDate()
  @Column()
  date: Date
  // Set Default date?

  @IsString()
  @Column('text')
  color: string

  @IsString()
  @Column('text')
  remark: string

  @ManyToOne(_ => Teacher, teacher => teacher.evaluations)
  teacher: Teacher

  @ManyToOne(_ => Student, student => student.evaluations)
  student: Student

}
