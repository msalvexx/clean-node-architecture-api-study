import { 
  AccessDeniedError, Account, Decrypter, LoadAccountByTokenRepository, 
  LoadAccountByToken, InvalidTokenError } from './load-account-by-token.protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly repo: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<Account> {
    try {
      await this.decrypter.decrypt(accessToken)
      await this.repo.loadByToken(accessToken, role)
    } catch (e) {
      this.throwAccessDeniedOnErrors(e);
    }
    return null
  }

  private throwAccessDeniedOnErrors (error: any): void {
    for (const errorThatThrows of [InvalidTokenError]) {
      if (error instanceof errorThatThrows) {
        throw new AccessDeniedError(error.stack)
      }
    }
  }
}
