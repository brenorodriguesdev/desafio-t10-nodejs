import { ParticipationModel } from '../../domain/models/participation'
import { makeParticipationRepository } from '../../tests/factories/repositories/participation-repository'
import { ParticipationRepository } from '../contracts/participation-repository'
import { CreateParticipationService } from './create-participation'

interface SutTypes {
  participationRepository: ParticipationRepository
  sut: CreateParticipationService
}

const makeSut = (): SutTypes => {
  const participationRepository = makeParticipationRepository()

  const sut = new CreateParticipationService(participationRepository)
  return {
    participationRepository,
    sut
  }
}

const makeData = (): ParticipationModel => ({
  firstName: 'firstName',
  lastName: 'lastName',
  participation: 10
})

describe('CreateParticipationService', () => {
  test('Garantir que o create seja chamado com os valores corretos', async () => {
    const { sut, participationRepository } = makeSut()
    const createSpy = jest.spyOn(participationRepository, 'create')
    await sut.create(makeData())
    expect(createSpy).toHaveBeenCalledWith(makeData())
  })

  test('Garantir que se o create retornar uma exceção o serviço repassará a exceção', async () => {
    const { sut, participationRepository } = makeSut()
    jest.spyOn(participationRepository, 'create').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.create(makeData())
    await expect(promise).rejects.toThrow()
  })
})
