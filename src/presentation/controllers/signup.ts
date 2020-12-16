import { InvalidParameterError, MissingParameterError } from '../errors'
import { badRequest, okRequest as ok, serverError } from '../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParameterError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParameterError('email'))
      }
      return ok()
    } catch (error) {
      return serverError()
    }
  }
}
