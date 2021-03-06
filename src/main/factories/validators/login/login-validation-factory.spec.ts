import { EmailValidation, ValidationComposite } from '@/validations/validators'
import { EmailValidator } from '@/validations/protocols/email-validator'
import { Validation } from '@/presentation/protocols/validation'
import { makeRequiredFieldsValidators } from '@/main/factories/validators/required-validators'
import { makeLoginValidation as sut } from './login-validation-factory'

jest.mock('@/validations/validators/composite/validation-composite')

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
