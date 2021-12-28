import { Controller } from '../../../presentation/contracts/controller'
import { GetAllParticipationService } from '../../../data/services/get-all-participation'
import { GetAllParticipationController } from '../../../presentation/controllers/get-all-participation'
import { ParticipationRepositoryFirebase } from '../../../infra/participation-repository-firebase'

export const makeGetAllParticipationController = (): Controller => {
  const participationRepositoryFirebase = new ParticipationRepositoryFirebase()
  const getAllParticipationService = new GetAllParticipationService(participationRepositoryFirebase)
  return new GetAllParticipationController(getAllParticipationService)
}
