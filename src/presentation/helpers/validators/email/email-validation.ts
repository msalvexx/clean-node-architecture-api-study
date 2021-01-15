import { InvalidParameterError } from '../../../errors'
import { EmailValidator } from '../../../protocols/email-validator'
import { Validation } from '../../../protocols/validation'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) { }

  validate (input: any): void {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      throw new InvalidParameterError(this.fieldName)
    }
  }
}
