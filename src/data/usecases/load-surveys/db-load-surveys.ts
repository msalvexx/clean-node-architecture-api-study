import { Survey, LoadSurveys, LoadSurveysRepository } from './db-load-surveys.protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly surveysRepo: LoadSurveysRepository) { }

  async load (): Promise<Survey[]> {
    await this.surveysRepo.load()
    return Promise.resolve(null)
  }
}
