import { AddSurvey, Controller, Validation, HttpRequest, HttpResponse } from './add-survey-controller.protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(httpRequest.body)
    await this.addSurvey.add(httpRequest.body)
    return Promise.resolve(null)
  }
}
