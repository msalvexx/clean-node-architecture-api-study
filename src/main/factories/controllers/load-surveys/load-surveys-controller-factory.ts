import { LoadSurveysController } from '../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeDefaultErrorsControllerDecorator } from '../../decorators/default-errors-controller-decorator-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '../../usecases/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys())
  const defaultErrorControllerDecorator = makeDefaultErrorsControllerDecorator(loadSurveysController)
  return makeLogControllerDecorator(defaultErrorControllerDecorator)
}
