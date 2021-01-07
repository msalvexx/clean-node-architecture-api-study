import { MongoHelper } from '../helpers/mongo.helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    const { id, ...accountWithoutId } = account
    expect(account).toBeTruthy()
    expect(id).toBeTruthy()
    expect(accountWithoutId).toEqual({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
})
