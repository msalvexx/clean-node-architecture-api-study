import { noContent, ok } from '../../../helpers/http/http-helper'
import { LoadSurveys, Controller, HttpRequest, HttpResponse } from './load-surveys-controller.protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly surveys: LoadSurveys) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.surveys.load()
    return surveys.length ? ok(surveys) : noContent()
  }
}
