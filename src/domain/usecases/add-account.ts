import { Account } from '@/domain/models/account'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export type AddAccount = {
  add: (accountModel: AddAccountModel) => Promise<Account>
}
