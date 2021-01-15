import { NotFoundModelError } from '../../errors/not-found-model-error'
import { UnauthorizedError } from '../../../domain/errors/unauthorized-error'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { InvalidHashError } from '../../errors/invalid-hash-error'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../protocols/criptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) { }

  async auth (credentials: AuthenticationModel): Promise<string> {
    try {
      return await this.tryAuthenticate(credentials)
    } catch (e) {
      const errorsToThrowUnauthorized = [NotFoundModelError, InvalidHashError]
      this.unauthorizeOnErrors(e, errorsToThrowUnauthorized)
      throw e
    }
  }

  private async tryAuthenticate (credentials: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(credentials.email)
    await this.hashComparer.compare(credentials.password, account.password)
    const accessToken = await this.tokenGenerator.generate(account.id)
    return accessToken
  }

  private unauthorizeOnErrors (e: any, errorsToThrowUnauthorized: any[]): void {
    for (const errorThatThrows of errorsToThrowUnauthorized) {
      if (e instanceof errorThatThrows) {
        throw new UnauthorizedError()
      }
    }
  }
}
