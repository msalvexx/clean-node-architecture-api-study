import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'
import { Validation, HttpRequest, HttpResponse, Authentication, UnauthorizedError, Controller } from './login.protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const accessToken = await this.authentication.auth(httpRequest.body)
      return ok(accessToken)
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return unauthorized()
      }
      return serverError(error)
    }
  }
}
