import { Router } from 'express'
import { adaptRouter } from '../adapters/express-controller'
import { makeCreateParticipationController } from '../factories/controllers/create-participation'
import { makeGetAllParticipationController } from '../factories/controllers/get-all-participation'

export default (router: Router): void => {
  router.post('/participation', adaptRouter(makeCreateParticipationController()))
  router.get('/participation', adaptRouter(makeGetAllParticipationController()))
}
