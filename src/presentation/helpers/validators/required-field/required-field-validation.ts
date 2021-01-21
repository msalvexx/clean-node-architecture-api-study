import { MissingParameterError } from '../../../errors'
import { Validation } from '../../../protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }
  async validate (input: any): Promise<void> {
    if (!input[this.fieldName]) {
      return Promise.reject(new MissingParameterError(this.fieldName))
    }
  }
}
