import { ValidationError } from '../../../presentation/errors/validation-error'
import { badRequest } from '../../../presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'

export class DefaultErrorControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.controller.handle(httpRequest)
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error)
      }
    }
  }
}
