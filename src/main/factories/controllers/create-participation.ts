import { CreateParticipationService } from '../../../data/services/create-participation'
import { ParticipationRepositoryTypeORM } from '../../../infra/participation-repository'
import { CreateParticipationController } from '../../../presentation/controllers/create-participation'
import { makeCreateParticipationValidator } from '../validators/create-participation'
import { Controller } from '../../../presentation/contracts/controller'

export const makeCreateParticipationController = (): Controller => {
  const participationRepositoryTypeORM = new ParticipationRepositoryTypeORM()
  const createParticipationService = new CreateParticipationService(participationRepositoryTypeORM)
  return new CreateParticipationController(makeCreateParticipationValidator(), createParticipationService)
}
