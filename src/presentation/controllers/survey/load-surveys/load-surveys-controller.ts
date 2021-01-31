import { LoadSurveys, Controller, HttpRequest, HttpResponse } from './load-surveys-controller.protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly surveys: LoadSurveys) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.surveys.load()
    return Promise.resolve(null)
  }
}
