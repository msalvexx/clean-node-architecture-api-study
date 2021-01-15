import { NotFoundModelError } from '../../../domain/errors/not-found-model-error'
import { UnauthorizedError } from '../../../domain/errors/unauthorized-error'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) { }

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
    const account = await this.loadAccountByEmailRepository.load(credentials.email)
    await this.hashComparer.compare(credentials.password, account.password)
    return null
  }
}
