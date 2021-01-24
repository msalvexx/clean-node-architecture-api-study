import { Controller, Validation, HttpRequest, HttpResponse } from './add-survey-controller.protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(httpRequest.body)
    return Promise.resolve(null)
  }
}
