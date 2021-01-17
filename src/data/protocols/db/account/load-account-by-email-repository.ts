import { Account } from '../../../../domain/models/account'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<Account>
}
