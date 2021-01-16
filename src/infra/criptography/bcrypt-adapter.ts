import { Hasher } from '../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
import { HashComparer } from '../../data/protocols/criptography/hash-comparer'

export class BCryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {
  }

  async compare (value: string, hashed: string): Promise<void> {
    await bcrypt.compare(value, hashed)
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
