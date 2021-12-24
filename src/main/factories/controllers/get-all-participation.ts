import { ParticipationRepositoryTypeORM } from '../../../infra/participation-repository'
import { Controller } from '../../../presentation/contracts/controller'
import { GetAllParticipationService } from '../../../data/services/get-all-participation'
import { GetAllParticipationController } from '../../../presentation/controllers/get-all-participation'

export const makeGetAllParticipationController = (): Controller => {
  const participationRepositoryTypeORM = new ParticipationRepositoryTypeORM()
  const getAllParticipationService = new GetAllParticipationService(participationRepositoryTypeORM)
  return new GetAllParticipationController(getAllParticipationService)
}
