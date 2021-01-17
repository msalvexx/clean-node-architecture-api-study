import {
  NotFoundModelError, InvalidCredentialsError, AuthenticationModel, InvalidHashError, HashComparer,
  Encrypter, LoadAccountByEmailRepository, UpdateAccessTokenRepository, Authentication
} from './db-authentication.protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly repo: LoadAccountByEmailRepository,
    private readonly hash: HashComparer,
    private readonly token: Encrypter,
    private readonly accessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth (credentials: AuthenticationModel): Promise<string> {
    try {
      const account = await this.repo.loadByEmail(credentials.email)
      await this.hash.compare(credentials.password, account.password)
      const token = await this.token.encrypt(account.id)
      await this.accessTokenRepository.update({ id: account.id, token })
      return token
    } catch (error) {
      this.throwInvalidCredentialsOnErrors(error)
      throw error
    }
  }

  private throwInvalidCredentialsOnErrors (error: any): void {
    for (const errorThatThrows of [NotFoundModelError, InvalidHashError]) {
      if (error instanceof errorThatThrows) {
        throw new InvalidCredentialsError()
      }
    }
  }
}
