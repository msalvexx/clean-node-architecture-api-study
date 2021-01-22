import { RequiredFieldValidation } from '../../../validations/validators'
import { Validation } from '../../../presentation/protocols'

export const makeRequiredFieldsValidators = (requiredFields: string[]): Validation[] => {
  const validations: Validation[] = []
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return validations
}
