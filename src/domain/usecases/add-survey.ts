import { Survey } from '@/domain/models/survey'

export type AddSurveyModel = Omit<Survey, 'id'>

export type AddSurvey = {
  add: (data: AddSurveyModel) => Promise<void>
}
