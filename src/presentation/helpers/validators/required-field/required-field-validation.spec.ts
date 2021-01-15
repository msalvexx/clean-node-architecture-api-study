import { MissingParameterError } from '../../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field')

describe('RequiredField Validation', () => {
  test('Should return MissingParamError if validation fails', () => {
    const sut = makeSut()
    expect(() => sut.validate({ name: 'any_name' })).toThrow(new MissingParameterError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
