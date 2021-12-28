import { ParticipationModel } from '../../domain/models/participation'
import { GetAllParticipationUseCase } from '../../domain/useCases/get-all-participation'
import { makeParticipation } from '../../tests/factories/entities/participation'
import { serverError, ok } from '../contracts/http-helper'
import { GetAllParticipationController } from './get-all-participation'

interface SutTypes {
  getAllParticipationUseCase: GetAllParticipationUseCase
  sut: GetAllParticipationController
}

const makeGetAllParticipationUseCase = (): GetAllParticipationUseCase => {
  class GetAllParticipationUseCaseStub implements GetAllParticipationUseCase {
    async get (): Promise<ParticipationModel[]> {
      return await new Promise(resolve => resolve([makeParticipation(1), makeParticipation(2)]))
    }
  }
  return new GetAllParticipationUseCaseStub()
}

const makeSut = (): SutTypes => {
  const getAllParticipationUseCase = makeGetAllParticipationUseCase()

  const sut = new GetAllParticipationController(getAllParticipationUseCase)
  return {
    getAllParticipationUseCase,
    sut
  }
}

describe('GetAllParticipationController', () => {
  test('Garantir que get seja chamado com os valores corretos', async () => {
    const { sut, getAllParticipationUseCase } = makeSut()
    const getSpy = jest.spyOn(getAllParticipationUseCase, 'get')
    await sut.handle()
    expect(getSpy).toHaveBeenCalledWith()
  })

  test('Garantir que se o get retornar uma exceção retornar um serverError', async () => {
    const { sut, getAllParticipationUseCase } = makeSut()
    jest.spyOn(getAllParticipationUseCase, 'get').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle()
    await expect(httpResponse).toEqual(serverError())
  })

  test('Garantir que se ocorrer tudo corretamente o serviço retornará participations', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok([makeParticipation(1), makeParticipation(2)]))
  })
})
