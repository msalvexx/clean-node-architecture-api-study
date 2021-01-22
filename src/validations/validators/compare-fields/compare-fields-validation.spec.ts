import { InvalidParameterError } from '../../../presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'fieldToCompare')

describe('CompareFields Validation', () => {
  test('Should return MissingParamError if validation fails', async () => {
    const sut = makeSut()
    const promise = sut.validate({ field: 'any_field', fieldToCompare: 'wrong_field' })
    await expect(promise).rejects.toThrow(new InvalidParameterError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', async () => {
    const sut = makeSut()
    const error = await sut.validate({ field: 'any_field', fieldToCompare: 'any_field' })
    expect(error).toBeFalsy()
  })
})
