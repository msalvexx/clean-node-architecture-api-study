import { Encrypter, Account, AddAccount, AddAccountModel } from './db-add-account.protocols'
import { AddAccountRepository } from '../../protocols/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<Account> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add({
      ...account,
      password: hashedPassword
    })
    return new Promise(resolve => resolve(null))
  }
}
