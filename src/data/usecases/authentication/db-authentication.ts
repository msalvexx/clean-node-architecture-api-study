import { NotFoundModelError } from '../../errors/not-found-model-error'
import { UnauthorizedError } from '../../../domain/errors/unauthorized-error'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { InvalidHashError } from '../../errors/invalid-hash-error'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../protocols/criptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly accountRepository: LoadAccountByEmailRepository,
    private readonly hash: HashComparer,
    private readonly token: TokenGenerator
  ) { }

  async auth (credentials: AuthenticationModel): Promise<string> {
    try {
      const account = await this.accountRepository.load(credentials.email)
      await this.hash.compare(credentials.password, account.password)
      return await this.token.generate(account.id)
    } catch (error) {
      this.throwUnauthorizeOnErrors(error)
      throw error
    }
  }

  private throwUnauthorizeOnErrors (error: any): void {
    for (const errorThatThrows of [NotFoundModelError, InvalidHashError]) {
      if (error instanceof errorThatThrows) {
        throw new UnauthorizedError()
      }
    }
  }
}
