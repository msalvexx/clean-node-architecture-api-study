import { InvalidParameterError } from '../../../errors'
import { Validation } from '../../../protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) { }
  async validate (input: any): Promise<void> {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return Promise.reject(new InvalidParameterError(this.fieldToCompareName))
    }
  }
}
