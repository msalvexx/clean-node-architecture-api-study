import { MissingParameterError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }
  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParameterError(this.fieldName)
    }
  }
}
