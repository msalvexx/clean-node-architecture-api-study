import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'

export const makeRequiredFieldsValidators = (requiredFields: string[]): Validation[] => {
  const validations: Validation[] = []
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return validations
}
