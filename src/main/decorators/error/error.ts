import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'

export class DefaultErrorControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await this.controller.handle(httpRequest)
  }
}
