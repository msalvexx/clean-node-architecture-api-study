import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'))
  }
}))

describe('BCrypt Adapter', () => {
  test('Should call encrypt with correct values', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return hash on success', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashedValue = await sut.encrypt('any_value')
    expect(hashedValue).toBe('hashed_value')
  })
})
