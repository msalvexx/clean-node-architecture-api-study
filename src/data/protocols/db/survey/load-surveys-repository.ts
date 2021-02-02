import { Survey } from '@/domain/models/survey'

export interface LoadSurveysRepository {
  loadAll: () => Promise<Survey[]>
}