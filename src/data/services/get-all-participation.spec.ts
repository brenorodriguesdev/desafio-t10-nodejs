import { makeParticipation } from '../../tests/factories/entities/participation'
import { makeParticipationRepository } from '../../tests/factories/repositories/participation-repository'
import { ParticipationRepository } from '../contracts/participation-repository'
import { GetAllParticipationService } from './get-all-participation'

interface SutTypes {
  participationRepository: ParticipationRepository
  sut: GetAllParticipationService
}

const makeSut = (): SutTypes => {
  const participationRepository = makeParticipationRepository()

  const sut = new GetAllParticipationService(participationRepository)
  return {
    participationRepository,
    sut
  }
}

describe('GetAllParticipationService', () => {
  test('Garantir que o getAll seja chamado com os valores corretos', async () => {
    const { sut, participationRepository } = makeSut()
    const createSpy = jest.spyOn(participationRepository, 'getAll')
    await sut.get()
    expect(createSpy).toHaveBeenCalledWith()
  })

  test('Garantir que se o getAll retornar uma exceção o serviço repassará a exceção', async () => {
    const { sut, participationRepository } = makeSut()
    jest.spyOn(participationRepository, 'getAll').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.get()
    await expect(promise).rejects.toThrow()
  })

  test('Garantir que se tudo ocorrer do jeito certo retornar participations', async () => {
    const { sut } = makeSut()
    const participations = await sut.get()
    expect(participations).toEqual([makeParticipation(1), makeParticipation(2)])
  })
})
