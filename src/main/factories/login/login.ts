import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { LoginController } from '../../../presentation/controllers/login/login'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log/log'
import { makeLoginValidation } from './login-validation'

export const makeLoginController = (): Controller => {
  const validationComposite = makeLoginValidation()
  const loginController = new LoginController(validationComposite, null)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logErrorRepository)
}
