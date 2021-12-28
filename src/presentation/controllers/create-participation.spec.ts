import { ParticipationModel } from '../../domain/models/participation'
import { CreateParticipationUseCase } from '../../domain/useCases/create-participation'
import { Validator } from '../../validation/contracts/validator'
import { HttpRequest } from '../contracts/http'
import { badRequest, created, serverError } from '../contracts/http-helper'
import { CreateParticipationController } from './create-participation'

interface SutTypes {
  validator: Validator
  createParticipationUseCase: CreateParticipationUseCase
  sut: CreateParticipationController
}

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (): Error {
      return null
    }
  }
  return new ValidatorStub()
}

const makeCreateParticipationUseCase = (): CreateParticipationUseCase => {
  class CreateParticipationUseCaseStub implements CreateParticipationUseCase {
    async create (): Promise<void> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new CreateParticipationUseCaseStub()
}

const makeSut = (): SutTypes => {
  const validator = makeValidator()
  const createParticipationUseCase = makeCreateParticipationUseCase()

  const sut = new CreateParticipationController(validator, createParticipationUseCase)
  return {
    validator,
    createParticipationUseCase,
    sut
  }
}

const makeData = (): ParticipationModel => ({
  firstName: 'firstName',
  lastName: 'lastName',
  participation: 10
})

const makeRequest = (): HttpRequest => ({
  body: makeData()
})

describe('CreateParticipationController', () => {
  test('Garantir que validate seja chamado com os valores corretos', async () => {
    const { sut, validator } = makeSut()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(makeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeData())
  })

  test('Garantir que se o validate retornar uma exceção retornar um serverError', async () => {
    const { sut, validator } = makeSut()
    jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeRequest())
    await expect(httpResponse).toEqual(serverError())
  })

  test('Garantir que se o validate retornar um error retornar um badRequest', async () => {
    const { sut, validator } = makeSut()
    jest.spyOn(validator, 'validate').mockImplementationOnce(() => { return new Error() })
    const httpResponse = await sut.handle(makeRequest())
    await expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Garantir que create seja chamado com os valores corretos', async () => {
    const { sut, createParticipationUseCase } = makeSut()
    const createSpy = jest.spyOn(createParticipationUseCase, 'create')
    await sut.handle(makeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeData())
  })

  test('Garantir que se o create retornar uma exceção retornar um serverError', async () => {
    const { sut, createParticipationUseCase } = makeSut()
    jest.spyOn(createParticipationUseCase, 'create').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeRequest())
    await expect(httpResponse).toEqual(serverError())
  })

  test('Garantir que se ocorrer tudo corretamente o serviço retornará um created', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(created())
  })
})
