import { MissingParameterError } from '../../../presentation/errors'
import { Validation } from '../../../presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }
  async validate (input: any): Promise<void> {
    if (!input[this.fieldName]) {
      return Promise.reject(new MissingParameterError(this.fieldName))
    }
  }
}
