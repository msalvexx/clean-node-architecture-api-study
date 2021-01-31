import { Survey } from '../models/survey'
export interface LoadSurveys {
  load: () => Promise<Survey[]>
}
