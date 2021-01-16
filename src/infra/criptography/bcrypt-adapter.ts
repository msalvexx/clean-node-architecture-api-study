import { Hasher } from '../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Hasher {
  constructor (private readonly salt: number) {
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
