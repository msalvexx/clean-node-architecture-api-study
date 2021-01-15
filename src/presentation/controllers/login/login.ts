import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'
import { ValidationError, Validation, HttpRequest, HttpResponse, Authentication, InvalidCredentialsError, Controller } from './login.protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const accessToken = await this.authentication.auth(httpRequest.body)
      return ok(accessToken)
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error)
      }
      if (error instanceof InvalidCredentialsError) {
        return unauthorized()
      }
      return serverError(error)
    }
  }
}
