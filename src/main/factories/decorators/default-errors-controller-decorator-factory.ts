import { DefaultErrorControllerDecorator } from '@/main/decorators/error/error'
import { Controller } from '@/presentation/protocols'

export const makeDefaultErrorsControllerDecorator = (controller: Controller): Controller => {
  return new DefaultErrorControllerDecorator(controller)
}
