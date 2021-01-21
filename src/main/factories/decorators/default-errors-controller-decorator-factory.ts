import { Controller } from '../../../presentation/protocols'
import { DefaultErrorControllerDecorator } from '../../decorators/error/error'

export const makeDefaultErrorsControllerDecorator = (controller: Controller): Controller => {
  return new DefaultErrorControllerDecorator(controller)
}
