import { InvalidParameterError } from '../../../../presentation/errors'
import { EmailValidator } from '../../../protocols/email-validator'
import { Validation } from '../../../../presentation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) { }

  async validate (input: any): Promise<void> {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return Promise.reject(new InvalidParameterError(this.fieldName))
    }
  }
}
