import { AccessDeniedError, Account, Decrypter, LoadAccountByTokenRepository, LoadAccountByToken } from './load-account-by-token.protocols'
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error'

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
      if (e instanceof InvalidCredentialsError) {
        throw new AccessDeniedError()
      }
    }
    return null
  }
}
