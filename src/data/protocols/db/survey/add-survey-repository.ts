import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

export interface AddSurveyRepository {
  add: (SurveyModel: AddSurveyModel) => Promise<void>
}