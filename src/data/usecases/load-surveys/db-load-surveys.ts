import { Survey, LoadSurveys, LoadSurveysRepository } from './db-load-surveys.protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly surveysRepo: LoadSurveysRepository) { }

  async load (): Promise<Survey[]> {
    return await this.surveysRepo.load()
  }
}
