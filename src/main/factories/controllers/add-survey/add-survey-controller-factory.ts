import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '@/presentation/protocols'
import { makeDefaultErrorsControllerDecorator } from '@/main/factories/decorators/default-errors-controller-decorator-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeAddSurveyValidation } from '@/main/factories/validators/add-survey/add-survey-validation-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  const defaultErrorControllerDecorator = makeDefaultErrorsControllerDecorator(addSurveyController)
  return makeLogControllerDecorator(defaultErrorControllerDecorator)
}
