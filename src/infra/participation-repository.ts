import { getRepository } from 'typeorm'
import { ParticipationRepository } from '../data/contracts/participation-repository'
import { Participation } from '../data/entities/participation'

export class ParticipationRepositoryTypeORM implements ParticipationRepository {
  async getAll (): Promise<Participation[]> {
    const participationRepository = getRepository(Participation)
    return await participationRepository.find()
  }

  async create (participation: Participation): Promise<void> {
    const participationRepository = getRepository(Participation)
    participation.id = await participationRepository.count() + 1
    await participationRepository.save(participation)
  }
}
