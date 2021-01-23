import { AttributeDuplicatedError } from '../../../presentation/errors/email-duplicated-error'
import { Validation } from '../../../presentation/protocols'
import { UniqueValidator } from '../../protocols/unique-validator'

export class UniqueFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly uniqueValidator: UniqueValidator
  ) {}

  async validate (input: any): Promise<void> {
    const inputIsUnique = await this.uniqueValidator.isUnique({ [this.fieldName]: input[this.fieldName] })
    if (!inputIsUnique) {
      return Promise.reject(new AttributeDuplicatedError(this.fieldName))
    }
  }
}
