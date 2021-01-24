import { LoginController } from '../../../../presentation/controllers/auth/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeDefaultErrorsControllerDecorator } from '../../decorators/default-errors-controller-decorator-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLoginValidation } from '../../validators/login/login-validation-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidation(), makeDbAuthentication())
  const defaultErrorControllerDecorator = makeDefaultErrorsControllerDecorator(loginController)
  return makeLogControllerDecorator(defaultErrorControllerDecorator)
}
