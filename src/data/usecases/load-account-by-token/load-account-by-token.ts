import { 
  AccessDeniedError, Account, Decrypter, LoadAccountByTokenRepository, 
  LoadAccountByToken, InvalidTokenError, NotFoundModelError } from './load-account-by-token.protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly repo: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<Account> {
    try {
      await this.decrypter.decrypt(accessToken)
      const account = await this.repo.loadByToken(accessToken, role)
      return account
    } catch (e) {
      this.throwAccessDeniedOnErrors(e);
      throw e
    }
  }

  private throwAccessDeniedOnErrors (error: any): void {
    for (const errorThatThrows of [NotFoundModelError, InvalidTokenError]) {
      if (error instanceof errorThatThrows) {
        throw new AccessDeniedError(error.stack)
      }
    }
  }
}
