import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { Account } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo.helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountModel: AddAccountModel): Promise<Account> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountModel)
    const mongoAccountModel = result.ops.pop()
    const { _id, ...accountWithoutId } = mongoAccountModel
    const account = {
      ...{ id: _id },
      ...accountWithoutId
    }
    return new Promise(resolve => resolve(account))
  }
}
