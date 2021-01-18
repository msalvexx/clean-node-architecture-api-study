import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import env from '../../config/env'
import { DefaultErrorControllerDecorator } from '../../decorators/error/error'
import { LogControllerDecorator } from '../../decorators/log/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const validationComposite = makeLoginValidation()
  const accountRepository = new AccountMongoRepository()
  const salt = 12
  const hashComparer = new BCryptAdapter(salt)
  const token = new JwtAdapter(env.jwtSecret)
  const authentication = new DbAuthentication(accountRepository, hashComparer, token, accountRepository)
  const loginController = new LoginController(validationComposite, authentication)
  const defaultErrorControllerDecorator = new DefaultErrorControllerDecorator(loginController)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(defaultErrorControllerDecorator, logErrorRepository)
}
