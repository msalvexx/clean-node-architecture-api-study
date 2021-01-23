import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { CompareFieldsValidation, EmailValidation, ValidationComposite, UniqueFieldValidation } from '../../../../validations/validators'
import { Validation } from '../../../../presentation/protocols'
import { EmailValidatorAdapter, UniqueValidatorAdapter } from '../../../../infra/validators'
import { makeRequiredFieldsValidators } from '../../validators/required-validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  const accountRepository = new AccountMongoRepository()
  const uniqueValidatorAdapter = new UniqueValidatorAdapter(accountRepository)
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['name', 'email', 'password', 'passwordConfirmation']),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
    new EmailValidation('email', emailValidator),
    new UniqueFieldValidation('email', uniqueValidatorAdapter)
  ]
  return new ValidationComposite(validations)
}
