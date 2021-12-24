import { CreateParticipationUseCase } from '../../domain/useCases/create-participation'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, created, serverError } from '../contracts/http-helper'

export class CreateParticipationController implements Controller {
  constructor (private readonly validator: Validator, private readonly createParticipationUseCase: CreateParticipationUseCase) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      await this.createParticipationUseCase.create(httpRequest.body)
      return created()
    } catch (error) {
      return serverError()
    }
  }
}
