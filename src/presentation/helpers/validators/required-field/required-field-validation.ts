import { MissingParameterError } from '../../../errors'
import { Validation } from '../../../protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }
  validate (input: any): void {
    if (!input[this.fieldName]) {
      throw new MissingParameterError(this.fieldName)
    }
  }
}
