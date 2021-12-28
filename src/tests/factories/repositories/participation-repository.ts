import { ParticipationRepository } from '../../../data/contracts/participation-repository'
import { Participation } from '../../../data/entities/participation'
import { makeParticipation } from '../entities/participation'

export const makeParticipationRepository = (): ParticipationRepository => {
  class ParticipationRepositoryStub implements ParticipationRepository {
    async getAll (): Promise<Participation[]> {
      return await new Promise(resolve => resolve([makeParticipation(1), makeParticipation(2)]))
    }

    async create (): Promise<void> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new ParticipationRepositoryStub()
}
