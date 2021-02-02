import { Collection } from 'mongodb'
import { NotFoundModelError } from '@/data/errors/not-found-model-error'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo.helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

const makeFakeAccount = (): any => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
  accessToken: 'any_token'
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

  describe('add()', () => {
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
  })

  describe('updateAccessToken()', () => {
    test('Should return nothing on updateAccessToken success', async () => {
      const sut = makeSut()
      const result = await accountCollection.insertOne(makeFakeAccount())
      const fakeAccountId = result.ops.pop()._id
      await sut.updateAccessToken({ id: fakeAccountId, token: 'any_token' })
      const account = await accountCollection.findOne({ _id: fakeAccountId })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadByEmail()', () => {
    test('Should throw NotFoundModelError on loadByEmail returns null', async () => {
      const sut = makeSut()
      const promise = sut.loadByEmail('any_email@email.com')
      await expect(promise).rejects.toThrow(new NotFoundModelError('account'))
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
        password: 'any_password',
        accessToken: 'any_token'
      })
    })
  })

  describe('exists()', () => {
    test('Should return true if email already exists in collection', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(makeFakeAccount())
      const result = await sut.exists({ email: 'any_email@email.com' })
      expect(result).toBeTruthy()
    })

    test('Should return false if email not exists in collection', async () => {
      const sut = makeSut()
      const result = await sut.exists({ email: 'any_email@email.com' })
      expect(result).toBeFalsy()
    })
  })

  describe('loadByToken()', () => {
    test('Should throw NotFoundModelError on loadByToken returns null', async () => {
      const sut = makeSut()
      const promise = sut.loadByToken('any_token')
      await expect(promise).rejects.toThrow(new NotFoundModelError('account'))
    })

    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(makeFakeAccount())
      const account = await sut.loadByToken('any_token')
      const { id, ...accountWithoutId } = account
      expect(account).toBeTruthy()
      expect(id).toBeTruthy()
      expect(accountWithoutId).toEqual({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
    })

    test('Should return an account on loadByToken invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...makeFakeAccount(),
        role: 'any_token'
      })
      const promise = sut.loadByToken('any_token', 'admin')
      await expect(promise).rejects.toThrowError(NotFoundModelError)
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...makeFakeAccount(),
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      const { id, ...accountWithoutId } = account
      expect(account).toBeTruthy()
      expect(id).toBeTruthy()
      expect(accountWithoutId).toEqual({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
    })

    test('Should return an account on loadByToken if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...makeFakeAccount(),
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token')
      const { id, ...accountWithoutId } = account
      expect(account).toBeTruthy()
      expect(id).toBeTruthy()
      expect(accountWithoutId).toEqual({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
    })
  })
})
