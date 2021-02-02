import { Account } from '@/domain/models/account'

export type AddAccountModel = Omit<Account, 'id'>

export type AddAccount = {
  add: (accountModel: AddAccountModel) => Promise<Account>
}
