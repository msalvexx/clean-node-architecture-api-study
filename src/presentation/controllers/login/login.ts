import { InvalidParameterError, MissingParameterError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup.protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return new Promise(resolve => resolve(badRequest(new MissingParameterError('email'))))
      }
      if (!password) {
        return new Promise(resolve => resolve(badRequest(new MissingParameterError('password'))))
      }
      if (!this.emailValidator.isValid(email)) {
        return new Promise(resolve => resolve(badRequest(new InvalidParameterError('email'))))
      }
      return new Promise(resolve => resolve(ok('ok')))
    } catch (error) {
      return new Promise(resolve => resolve(serverError(error)))
    }
  }
}
