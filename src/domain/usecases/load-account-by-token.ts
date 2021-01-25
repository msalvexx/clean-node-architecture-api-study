import { Account } from '../models/account'

export interface LoadAccountByToken {
  loadByToken: (accessToken: string, role?: string) => Promise<Account>
}
