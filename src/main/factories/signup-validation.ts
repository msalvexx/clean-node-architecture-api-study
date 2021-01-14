import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../presentation/helpers/validators/email-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { makeRequiredFieldsValidators } from './required-validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation']),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
    new EmailValidation('email', emailValidator)
  ]
  return new ValidationComposite(validations)
}
