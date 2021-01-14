import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeRequiredFieldsValidators } from './required-validation'
import { makeSignUpValidation as sut } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    sut()
    const validations: Validation[] = [
      ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation'])
    ]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
