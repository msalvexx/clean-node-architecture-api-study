import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { makeRequiredFieldsValidators } from '../validators/required-validators'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['email', 'password']),
    new EmailValidation('email', emailValidator)
  ]
  return new ValidationComposite(validations)
}
