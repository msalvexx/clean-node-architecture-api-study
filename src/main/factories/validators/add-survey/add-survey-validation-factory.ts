import { ValidationComposite } from '../../../../validations/validators'
import { Validation } from '../../../../presentation/protocols'
import { makeRequiredFieldsValidators } from '../../validators/required-validators'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...makeRequiredFieldsValidators(['question', 'answers'])
  ]
  return new ValidationComposite(validations)
}
