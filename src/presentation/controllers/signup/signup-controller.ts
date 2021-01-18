import { ok } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, AddAccount, Validation } from './signup-controller.protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    const { passwordConfirmation, ...dataWithoutPasswordConfirmation } = httpRequest.body
    const account = await this.addAccount.add(dataWithoutPasswordConfirmation)
    return ok(account)
  }
}
