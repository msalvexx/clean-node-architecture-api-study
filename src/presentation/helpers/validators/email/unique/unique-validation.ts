import { AssertAccountExistsByEmailRepository } from '../../../../../data/usecases/authentication/db-authentication.protocols'
import { Validation } from '../../../../protocols/validation'

export class UniqueEmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly repo: AssertAccountExistsByEmailRepository
  ) {}

  async validate (input: any): Promise<void> {
    await this.repo.exists(input[this.fieldName])
  }
}
