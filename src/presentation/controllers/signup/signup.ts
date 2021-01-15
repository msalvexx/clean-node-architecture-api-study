import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, AddAccount, Validation, ValidationError } from './signup.protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const { passwordConfirmation, ...dataWithoutPasswordConfirmation } = httpRequest.body
      const account = await this.addAccount.add(dataWithoutPasswordConfirmation)
      return ok(account)
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
