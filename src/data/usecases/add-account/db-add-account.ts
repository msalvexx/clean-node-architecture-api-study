import { Encrypter, Account, AddAccount, AddAccountModel } from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {
  }

  async add (account: AddAccountModel): Promise<Account> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
