import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo.helper'
import { AccountMongoRepository } from './account'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

const makeFakeAccount = (): any => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on add success', async () => {
    const sut = makeSut()
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

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne(makeFakeAccount())
    const account = await sut.loadByEmail('any_email@email.com')
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
