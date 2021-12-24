import { CreateParticipationUseCase } from '../../domain/useCases/create-participation'
import { ParticipationRepository } from '../contracts/participation-repository'
import { Participation } from '../entities/participation'

export class CreateParticipationService implements CreateParticipationUseCase {
  constructor (private readonly participationRepository: ParticipationRepository) {}
  async create (data: Participation): Promise<void> {
    await this.participationRepository.create(data)
  }
}
