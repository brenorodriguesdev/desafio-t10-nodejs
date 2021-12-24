import { Participation } from '../entities/participation'

export interface ParticipationRepository {
  create: (participation: Participation) => Promise<void>
  getAll: () => Promise<Participation[]>
}
