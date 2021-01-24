import { ok, unauthorized } from '../../../helpers/http/http-helper'
import { Validation, HttpRequest, HttpResponse, Authentication, InvalidCredentialsError, Controller } from './login-controller.protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.validation.validate(httpRequest.body)
      const accessToken = await this.authentication.auth(httpRequest.body)
      return ok({ accessToken })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return unauthorized()
      }
      throw error
    }
  }
}
