import { Survey } from '../../../../domain/models/survey'

export interface LoadSurveysRepository {
  load: () => Promise<Survey[]>
}