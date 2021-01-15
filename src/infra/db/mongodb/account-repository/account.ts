import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { Account } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo.helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountModel: AddAccountModel): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountModel)
    return MongoHelper.map(result.ops.pop())
  }
}
