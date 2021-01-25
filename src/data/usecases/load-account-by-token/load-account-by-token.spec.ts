import { Decrypter } from './load-account-by-token.protocols'
import { DbLoadAccountByToken } from './load-account-by-token'

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string> {
        return Promise.resolve('any_value')
      }
    }
    const decrypterStub = new DecrypterStub()
    const sut = new DbLoadAccountByToken(decrypterStub)
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
