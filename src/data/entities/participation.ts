import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  participation: number
}
