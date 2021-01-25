import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeDefaultErrorsControllerDecorator } from '../../decorators/default-errors-controller-decorator-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddSurveyValidation } from '../../validators/add-survey/add-survey-validation-factory'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const loginController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  const defaultErrorControllerDecorator = makeDefaultErrorsControllerDecorator(loginController)
  return makeLogControllerDecorator(defaultErrorControllerDecorator)
}
