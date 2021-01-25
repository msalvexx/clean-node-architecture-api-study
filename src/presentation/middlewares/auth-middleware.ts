import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { LoadAccountByToken, AccessDeniedError, HttpRequest, HttpResponse, Middleware } from './auth-middleware.protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccount: LoadAccountByToken, private readonly role: string) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (!accessToken) {
        throw new AccessDeniedError()
      }
      const account = await this.loadAccount.load(accessToken, this.role)
      return ok({ accountId: account.id })
    } catch (e) {
      if (e instanceof AccessDeniedError) {
        return forbidden(e)
      }
      return serverError(e)
    }
  }
}
