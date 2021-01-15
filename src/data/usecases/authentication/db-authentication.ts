import { NotFoundModelError } from '../../../domain/errors/not-found-model-error'
import { UnauthorizedError } from '../../../domain/errors/unauthorized-error'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) { }

  async auth (credentials: AuthenticationModel): Promise<string> {
    try {
      return await this.tryLogUser(credentials)
    } catch (e) {
      this.throwUnauthorizedWhenNotFound(e)
      throw e
    }
  }

  private throwUnauthorizedWhenNotFound (e: any): void {
    if (e instanceof NotFoundModelError) {
      throw new UnauthorizedError()
    }
  }

  private async tryLogUser (credentials: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(credentials.email)
    return null
  }
}
