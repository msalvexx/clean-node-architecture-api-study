import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeRequiredFieldsValidators } from './required-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation'])
  ]
  return new ValidationComposite(validations)
}
