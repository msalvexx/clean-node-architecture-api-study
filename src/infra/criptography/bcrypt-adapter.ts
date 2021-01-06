import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {
  }

  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return new Promise(resolve => resolve(''))
  }
}
