import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) { }

  async auth (credentials: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(credentials.email)
    return null
  }
}
