import { 
  Decrypter, AccessDeniedError, Account, 
  LoadAccountByTokenRepository, InvalidTokenError } from './load-account-by-token.protocols'
import { DbLoadAccountByToken } from './load-account-by-token'

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  repoStub: LoadAccountByTokenRepository
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

const makeFakeAccount = (): Account => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken(token: string, role: string): Promise<Account> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeSut = (): SutTypes => {
  const repoStub = makeLoadAccountByTokenRepository()
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub, repoStub)
  return {
    sut,
    decrypterStub,
    repoStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should throw AccessDeniedError if decrypt fails', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockRejectedValueOnce(new InvalidTokenError('any_stack'))
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow(AccessDeniedError)
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, repoStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(repoStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })
})
