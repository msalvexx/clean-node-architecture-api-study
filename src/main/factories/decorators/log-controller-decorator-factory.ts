import { Controller } from '@/presentation/protocols'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '@/main/decorators/log/log-controller-decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
