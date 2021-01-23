import { EmailValidation, ValidationComposite } from '../../../../validations/validators'
import { Validation } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../../infra/validators'
import { makeRequiredFieldsValidators } from '../../validators/required-validators'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['email', 'password']),
    new EmailValidation('email', emailValidator)
  ]
  return new ValidationComposite(validations)
}
