import { MissingParameterError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return new Promise(resolve => resolve(badRequest(new MissingParameterError('email'))))
    }
    if (!password) {
      return new Promise(resolve => resolve(badRequest(new MissingParameterError('password'))))
    }
    return new Promise(resolve => resolve(ok('ok')))
  }
}
