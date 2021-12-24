import { GetAllParticipationUseCase } from '../../domain/useCases/get-all-participation'
import { ParticipationRepository } from '../contracts/participation-repository'
import { Participation } from '../entities/participation'

export class GetAllParticipationService implements GetAllParticipationUseCase {
  constructor (private readonly participationRepository: ParticipationRepository) {}
  async get (): Promise<Participation[]> {
    return await this.participationRepository.getAll()
  }
}
