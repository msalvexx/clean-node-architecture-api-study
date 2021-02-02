import { AttributeDuplicatedError } from '@/presentation/errors/attribute-duplicated-error'
import { Validation } from '@/presentation/protocols'
import { UniqueValidator } from '@/validations/protocols'

export class UniqueFieldValidation implements Validation {
  constructor (
    private readonly fieldNames: string[],
    private readonly uniqueValidator: UniqueValidator
  ) {}

  async validate (input: any): Promise<void> {
    const inputsToValidate = this.getInputs(input)
    const inputIsUnique = await this.uniqueValidator.isUnique(inputsToValidate)
    if (!inputIsUnique) {
      return Promise.reject(new AttributeDuplicatedError(Object.keys(inputsToValidate)))
    }
  }

  getInputs (input: any): any {
    let inputsToValidate = { }
    for (const fieldName of this.fieldNames) {
      if (Object.keys(input).includes(fieldName)) {
        inputsToValidate = { ...inputsToValidate, [fieldName]: input[fieldName] }
      }
    }
    return inputsToValidate
  }
}
