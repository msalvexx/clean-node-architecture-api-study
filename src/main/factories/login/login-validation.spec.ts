import { EmailValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { Validation } from '../../../presentation/protocols/validation'
import { makeRequiredFieldsValidators } from '../validators/required-validators'
import { makeLoginValidation as sut } from './login-validation'

jest.mock('../../../presentation/helpers/validators/composite/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Login Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    sut()
    const emailValidatorStub = makeEmailValidator()
    const validations: Validation[] = [
      ...makeRequiredFieldsValidators(['email', 'password']),
      new EmailValidation('email', emailValidatorStub)
    ]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
