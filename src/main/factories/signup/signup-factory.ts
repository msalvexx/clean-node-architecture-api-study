import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import env from '../../config/env'
import { DefaultErrorControllerDecorator } from '../../decorators/error/error'
import { LogControllerDecorator } from '../../decorators/log/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const hasher = new BCryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(hasher, addAccountRepository)
  const validationComposite = makeSignUpValidation()
  const accountRepository = new AccountMongoRepository()
  const hashComparer = new BCryptAdapter(salt)
  const token = new JwtAdapter(env.jwtSecret)
  const authentication = new DbAuthentication(accountRepository, hashComparer, token, accountRepository)
  const signUpController = new SignUpController(addAccount, validationComposite, authentication)
  const defaultErrorControllerDecorator = new DefaultErrorControllerDecorator(signUpController)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(defaultErrorControllerDecorator, logMongoRepository)
}
