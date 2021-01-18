import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import { DefaultErrorControllerDecorator } from '../../decorators/error/error'
import { LogControllerDecorator } from '../../decorators/log/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const validationComposite = makeLoginValidation()
  const loginController = new LoginController(validationComposite, null)
  const defaultErrorControllerDecorator = new DefaultErrorControllerDecorator(loginController)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(defaultErrorControllerDecorator, logErrorRepository)
}
