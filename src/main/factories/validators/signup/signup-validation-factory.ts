import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { CompareFieldsValidation, EmailValidation, ValidationComposite, UniqueEmailValidation } from '../../../../validations/validators'
import { Validation } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator-adapter'
import { makeRequiredFieldsValidators } from '../../validators/required-validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  const assertAccountExistsByEmailRepository = new AccountMongoRepository()
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation']),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
    new EmailValidation('email', emailValidator),
    new UniqueEmailValidation('email', assertAccountExistsByEmailRepository)
  ]
  return new ValidationComposite(validations)
}
