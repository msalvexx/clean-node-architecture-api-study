import {
  NotFoundModelError, UnauthorizedError, AuthenticationModel, InvalidHashError, HashComparer,
  TokenGenerator, LoadAccountByEmailRepository, UpdateAccessTokenRepository, Authentication
} from './db-authentication.protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly accountRepository: LoadAccountByEmailRepository,
    private readonly hash: HashComparer,
    private readonly token: TokenGenerator,
    private readonly accessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth (credentials: AuthenticationModel): Promise<string> {
    try {
      const account = await this.accountRepository.load(credentials.email)
      await this.hash.compare(credentials.password, account.password)
      const token = await this.token.generate(account.id)
      await this.accessTokenRepository.update({ id: account.id, token })
      return token
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
