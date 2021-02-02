import { LoginController } from '@/presentation/controllers/auth/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { makeDefaultErrorsControllerDecorator } from '@/main/factories/decorators/default-errors-controller-decorator-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { makeLoginValidation } from '@/main/factories/validators/login/login-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidation(), makeDbAuthentication())
  const defaultErrorControllerDecorator = makeDefaultErrorsControllerDecorator(loginController)
  return makeLogControllerDecorator(defaultErrorControllerDecorator)
}
