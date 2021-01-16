import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { DefaultErrorControllerDecorator } from '../../decorators/error/error'
import { LogControllerDecorator } from '../../decorators/log/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const hasher = new BCryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(hasher, addAccountRepository)
  const validationComposite = makeSignUpValidation()
  const signUpController = new SignUpController(addAccount, validationComposite)
  const defaultErrorControllerDecorator = new DefaultErrorControllerDecorator(signUpController)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(defaultErrorControllerDecorator, logMongoRepository)
}
