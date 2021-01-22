import { AssertAccountExistsByEmailRepository } from '../../../../data/usecases/authentication/db-authentication.protocols'
import { CompareFieldsValidation, ValidationComposite, EmailValidation, UniqueEmailValidation } from '../../../../validations/validators'
import { Validation } from '../../../../presentation/protocols'
import { EmailValidator } from '../../../../validations/protocols/email-validator'
import { makeRequiredFieldsValidators } from '../../validators/required-validators'
import { makeSignUpValidation as sut } from './signup-validation-factory'

jest.mock('../../../../validations/validators/composite/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAssertAccountExistsByEmailRepository = (): AssertAccountExistsByEmailRepository => {
  class AssertAccountExistsByEmailRepositoryStub implements AssertAccountExistsByEmailRepository {
    async exists (email: string): Promise<boolean> {
      return Promise.resolve(false)
    }
  }
  return new AssertAccountExistsByEmailRepositoryStub()
}

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    sut()
    const emailValidatorStub = makeEmailValidator()
    const assertAccountExistsByEmailRepositoryStub = makeAssertAccountExistsByEmailRepository()
    const validations: Validation[] = [
      ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation']),
      new CompareFieldsValidation('password', 'passwordConfirmation'),
      new EmailValidation('email', emailValidatorStub),
      new UniqueEmailValidation('email', assertAccountExistsByEmailRepositoryStub)
    ]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
