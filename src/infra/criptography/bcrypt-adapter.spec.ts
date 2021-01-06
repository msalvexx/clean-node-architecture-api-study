import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

describe('BCrypt Adapter', () => {
  test('Should call encrypt with correct values', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
