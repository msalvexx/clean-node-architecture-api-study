import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccount: LoadAccountByToken) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (!accessToken) {
        throw new AccessDeniedError()
      }
      const account = await this.loadAccount.loadByToken(accessToken)
      return ok({ accountId: account.id })
    } catch (e) {
      if (e instanceof AccessDeniedError) {
        return forbidden(e)
      }
      return serverError(e)
    }
  }
}
