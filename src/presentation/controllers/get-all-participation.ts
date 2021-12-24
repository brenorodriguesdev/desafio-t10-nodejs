import { GetAllParticipationUseCase } from '../../domain/useCases/get-all-participation'
import { Controller } from '../contracts/controller'
import { HttpResponse } from '../contracts/http'
import { ok, serverError } from '../contracts/http-helper'

export class GetAllParticipationController implements Controller {
  constructor (private readonly getAllParticipationUseCase: GetAllParticipationUseCase) {}
  async handle (): Promise<HttpResponse> {
    try {
      const participations = await this.getAllParticipationUseCase.get()
      return ok(participations)
    } catch (error) {
      return serverError()
    }
  }
}
