import bcrypt from 'bcrypt'
import { Hasher } from '../../../data/protocols/criptography/hasher'
import { HashComparer } from '../../../data/protocols/criptography/hash-comparer'
import { InvalidHashError } from '../../../data/errors/invalid-hash-error'

export class BCryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {
  }

  async compare (value: string, hashed: string): Promise<void> {
    const matches = await bcrypt.compare(value, hashed)
    if (!matches) {
      throw new InvalidHashError()
    }
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
