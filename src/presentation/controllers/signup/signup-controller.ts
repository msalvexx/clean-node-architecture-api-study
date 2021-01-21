import { ok } from '../../helpers/http/http-helper'
import { Authentication, Controller, HttpRequest, HttpResponse, AddAccount, Validation } from './signup-controller.protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    const { passwordConfirmation, ...dataWithoutPasswordConfirmation } = httpRequest.body
    const { name, ...credentials } = dataWithoutPasswordConfirmation
    const account = await this.addAccount.add(dataWithoutPasswordConfirmation)
    const token = await this.authentication.auth(credentials)
    return ok({ accessToken: token, name: account.name })
  }
}
