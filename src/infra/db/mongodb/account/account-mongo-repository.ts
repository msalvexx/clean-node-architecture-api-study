import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { ExistsRegisterInRepository } from '../../../../data/protocols/db/exists-register-in-repository'
import { LoadAccountByEmailRepository, NotFoundModelError, UpdateAccessTokenModel, UpdateAccessTokenRepository } from '../../../../data/usecases/authentication/db-authentication.protocols'
import { Account } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo.helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, ExistsRegisterInRepository {
  async exists (data: any): Promise<boolean> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne(data)
    return account !== null
  }

  async updateAccessToken (updateAccessTokenModel: UpdateAccessTokenModel): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const { id, token } = updateAccessTokenModel
    await accountCollection.updateOne({ _id: id }, { $set: { accessToken: token } })
  }

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
