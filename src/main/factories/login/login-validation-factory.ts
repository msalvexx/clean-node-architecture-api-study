import { EmailValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'
import { makeRequiredFieldsValidators } from '../validators/required-validators'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['email', 'password']),
    new EmailValidation('email', emailValidator)
  ]
  return new ValidationComposite(validations)
}
