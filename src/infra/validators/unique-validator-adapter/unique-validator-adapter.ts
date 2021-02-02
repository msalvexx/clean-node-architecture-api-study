import { ExistsRegisterInRepository } from '@/data/protocols/db/exists-register-in-repository'
import { UniqueValidator } from '@/validations/protocols/unique-validator'

export class UniqueValidatorAdapter implements UniqueValidator {
  constructor (private readonly repo: ExistsRegisterInRepository) { }

  async isUnique (data: any): Promise<boolean> {
    return !await this.repo.exists(data)
  }
}
