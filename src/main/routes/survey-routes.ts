import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapters'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
