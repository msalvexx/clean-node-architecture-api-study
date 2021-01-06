import { Encrypter, Account, AddAccount, AddAccountModel, AddAccountRepository } from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountModel: AddAccountModel): Promise<Account> {
    const hashedPassword = await this.encrypter.encrypt(accountModel.password)
    const account = await this.addAccountRepository.add({
      ...accountModel,
      password: hashedPassword
    })
    return account
  }
}
