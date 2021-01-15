import { NotFoundModelError } from '../../errors/not-found-model-error'
import { UnauthorizedError } from '../../../domain/errors/unauthorized-error'
import { Account } from '../../../domain/models/account'
import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { InvalidHashError } from '../../errors/invalid-hash-error'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../protocols/criptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'
import { UpdateAccessTokenModel, UpdateAccessTokenRepository } from '../../protocols/db/account/update-access-token-repository'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  tokenGeneratorStub: TokenGenerator
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<Account> {
      const account: Account = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'hashed_password'
      }
      return new Promise(resolve => resolve(account))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<void> {
    }
  }
  return new HashComparerStub()
}

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new TokenGeneratorStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update (updateAccessTokenModel: UpdateAccessTokenModel): Promise<void> {
      return null
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepository = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGeneratorStub = makeTokenGenerator()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepository,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub: loadAccountByEmailRepository,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  }
}

const makeFakeCredential = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

describe('DbAuthentication', () => {
  test('Should call LoadAccountByEmailRepository with correct email ', async () => {
    const { sut, loadAccountByEmailRepositoryStub: loadAccountByEmailRepository } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')
    await sut.auth(makeFakeCredential())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub: loadAccountByEmailRepository } = makeSut()
    jest.spyOn(loadAccountByEmailRepository, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeCredential())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw UnauthorizedError if LoadAccountByEmailRepository returns NotFoundModelError', async () => {
    const { sut, loadAccountByEmailRepositoryStub: loadAccountByEmailRepository } = makeSut()
    jest.spyOn(loadAccountByEmailRepository, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new NotFoundModelError('account'))))
    const promise = sut.auth(makeFakeCredential())
    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should call HashComparer with correct password ', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeCredential())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw Unauthorized if HashComparer throws InvalidHashError ', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new InvalidHashError())))
    const promise = sut.auth(makeFakeCredential())
    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw if HashComparer throws ', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeCredential())
    await expect(promise).rejects.toThrow()
  })

  test('Should call TokenGenerator with correct id ', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeCredential())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeCredential())
    await expect(promise).rejects.toThrow()
  })

  test('Should return token if authentication succeeds', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeFakeCredential())
    expect(accessToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
    await sut.auth(makeFakeCredential())
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'any_id',
      token: 'any_token'
    })
  })
})
