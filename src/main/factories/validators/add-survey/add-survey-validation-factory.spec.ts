import { ValidationComposite } from '../../../../validations/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeRequiredFieldsValidators } from '../required-validators'
import { makeAddSurveyValidation as sut } from './add-survey-validation-factory'

jest.mock('../../../../validations/validators/composite/validation-composite')

describe('Add Survey Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    sut()
    const validations: Validation[] = [
      ...makeRequiredFieldsValidators(['question', 'answers'])
    ]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
