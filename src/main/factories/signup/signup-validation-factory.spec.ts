import { CompareFieldsValidation, ValidationComposite, EmailValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeRequiredFieldsValidators } from '../validators/required-validators'
import { makeSignUpValidation as sut } from './signup-validation-factory'

jest.mock('../../../presentation/helpers/validators/composite/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    sut()
    const emailValidatorStub = makeEmailValidator()
    const validations: Validation[] = [
      ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation']),
      new CompareFieldsValidation('password', 'passwordConfirmation'),
      new EmailValidation('email', emailValidatorStub)
    ]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
