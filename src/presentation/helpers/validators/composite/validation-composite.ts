import { Validation } from '../../../protocols/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {
  }

  async validate (input: any): Promise<void> {
    for (const validation of this.validations) {
      await validation.validate(input)
    }
  }
}
