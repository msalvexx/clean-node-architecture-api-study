import { MissingParameterError } from '../../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field')

describe('RequiredField Validation', () => {
  test('Should return MissingParamError if validation fails', async () => {
    const sut = makeSut()
    const promise = sut.validate({ name: 'any_name' })
    await expect(promise).rejects.toThrow(new MissingParameterError('field'))
  })

  test('Should not return if validation succeeds', async () => {
    const sut = makeSut()
    const error = await sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
