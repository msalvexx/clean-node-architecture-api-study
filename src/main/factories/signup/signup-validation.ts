import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields/compare-fields-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email/email-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/composite/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { makeRequiredFieldsValidators } from '../validators/required-validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation']),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
    new EmailValidation('email', emailValidator)
  ]
  return new ValidationComposite(validations)
}
