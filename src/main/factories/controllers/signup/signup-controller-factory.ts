import { SignUpController } from '@/presentation/controllers/auth/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDefaultErrorsControllerDecorator } from '@/main/factories/decorators/default-errors-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { makeSignUpValidation } from '@/main/factories/validators/signup/signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  const defaultErrorControllerDecorator = makeDefaultErrorsControllerDecorator(signUpController)
  return makeLogControllerDecorator(defaultErrorControllerDecorator)
}
