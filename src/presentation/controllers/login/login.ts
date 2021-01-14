import { InvalidParameterError, MissingParameterError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication, UnauthorizedError } from './login.protocols'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParameterError(field))
        }
      }
      const { email, password } = httpRequest.body
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParameterError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)
      return ok(accessToken)
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return unauthorized()
      }
      return serverError(error)
    }
  }
}
