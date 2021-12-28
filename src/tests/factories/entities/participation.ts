import { Participation } from '../../../data/entities/participation'

export const makeParticipation = (id: number): Participation => {
  const participation = new Participation()
  participation.id = id
  participation.firstName = 'firstName ' + id
  participation.lastName = 'lastName ' + id
  participation.participation = 10
  return participation
}
