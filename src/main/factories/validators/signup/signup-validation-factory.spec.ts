import { CompareFieldsValidation, ValidationComposite, EmailValidation, UniqueFieldValidation } from '../../../../validations/validators'
import { Validation } from '../../../../presentation/protocols'
import { makeRequiredFieldsValidators } from '../../validators/required-validators'
import { makeSignUpValidation as sut } from './signup-validation-factory'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { EmailValidatorAdapter, UniqueValidatorAdapter } from '../../../../infra/validators'

jest.mock('../../../../validations/validators/composite/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    sut()
    const emailValidator = new EmailValidatorAdapter()
    const accountRepository = new AccountMongoRepository()
    const uniqueValidatorAdapter = new UniqueValidatorAdapter(accountRepository)
    const validations: Validation[] = [
      ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation']),
      new CompareFieldsValidation('password', 'passwordConfirmation'),
      new EmailValidation('email', emailValidator),
      new UniqueFieldValidation(['email'], uniqueValidatorAdapter)
    ]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
