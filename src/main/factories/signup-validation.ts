import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeRequiredFieldsValidators } from './required-validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation']),
    new CompareFieldsValidation('password', 'passwordConfirmation')
  ]
  return new ValidationComposite(validations)
}
