import { Router } from 'express'
import { makeLoginController } from '@/main/factories/controllers/login/login-controller-factory'
import { makeSignUpController } from '@/main/factories/controllers/signup/signup-controller-factory'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
