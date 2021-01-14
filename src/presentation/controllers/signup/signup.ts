import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, AddAccount, Validation } from './signup.protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { passwordConfirmation, ...dataWithoutPasswordConfirmation } = httpRequest.body
      const account = await this.addAccount.add(dataWithoutPasswordConfirmation)
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
