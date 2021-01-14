import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeRequiredFieldsValidators } from '../validators/required-validators'
import { makeLoginValidation as sut } from './login-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

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