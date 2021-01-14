import { InvalidParameterError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'fieldToCompare')

describe('CompareFields Validation', () => {
  test('Should return MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field', fieldToCompare: 'wrong_field' })
    expect(error).toEqual(new InvalidParameterError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field', fieldToCompare: 'any_field' })
    expect(error).toBeFalsy()
  })
})
