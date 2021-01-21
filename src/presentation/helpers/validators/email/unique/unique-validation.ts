import { AssertAccountExistsByEmailRepository } from '../../../../../data/usecases/authentication/db-authentication.protocols'
import { EmailDuplicatedError } from '../../../../errors/email-duplicated-error'
import { Validation } from '../../../../protocols/validation'

export class UniqueEmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly repo: AssertAccountExistsByEmailRepository
  ) {}

  async validate (input: any): Promise<void> {
    const emailExists = await this.repo.exists(input[this.fieldName])
    if (emailExists) {
      return Promise.reject(new EmailDuplicatedError(input[this.fieldName]))
    }
  }
}
