import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository, NotFoundModelError } from '../../../../data/usecases/authentication/db-authentication.protocols'
import { Account } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo.helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    this.throwNotFoundWhenNull(account)
    return MongoHelper.map(account)
  }

  private throwNotFoundWhenNull (account: any): void {
    if (!account) {
      throw new NotFoundModelError('account')
    }
  }

  async add (accountModel: AddAccountModel): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountModel)
    return MongoHelper.map(result.ops.pop())
  }
}
