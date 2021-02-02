import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/load-surveys/load-surveys-controller-factory'
import { auth, adminAuth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
