import { CreateParticipationService } from '../../../data/services/create-participation'
import { CreateParticipationController } from '../../../presentation/controllers/create-participation'
import { makeCreateParticipationValidator } from '../validators/create-participation'
import { Controller } from '../../../presentation/contracts/controller'
import { ParticipationRepositoryFirebase } from '../../../infra/participation-repository-firebase'

export const makeCreateParticipationController = (): Controller => {
  const participationRepositoryFirebase = new ParticipationRepositoryFirebase()
  const createParticipationService = new CreateParticipationService(participationRepositoryFirebase)
  return new CreateParticipationController(makeCreateParticipationValidator(), createParticipationService)
}
