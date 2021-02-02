import { Survey } from '@/domain/models/survey'
export interface LoadSurveys {
  load: () => Promise<Survey[]>
}
