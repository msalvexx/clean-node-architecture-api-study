import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { Controller } from '@/presentation/protocols'
import { makeDefaultErrorsControllerDecorator } from '@/main/factories/decorators/default-errors-controller-decorator-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '@/main/factories/usecases/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys())
  const defaultErrorControllerDecorator = makeDefaultErrorsControllerDecorator(loadSurveysController)
  return makeLogControllerDecorator(defaultErrorControllerDecorator)
}
