import { InvalidParameterError, MissingParameterError } from '../../../errors'
import { Validation } from '../../../protocols/validation'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStubs = [
    makeValidationStub(),
    makeValidationStub()
  ]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('ValidationComposite', () => {
  test('Should return validation error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockImplementationOnce(() => {
      throw new MissingParameterError('field')
    })
    expect(() => sut.validate({ field: 'any_value' })).toThrow(new MissingParameterError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockImplementationOnce(() => {
      throw new MissingParameterError('field')
    })
    jest.spyOn(validationStubs[1], 'validate').mockImplementationOnce(() => {
      throw new InvalidParameterError('field')
    })
    expect(() => sut.validate({ field: 'any_value' })).toThrow(new MissingParameterError('field'))
  })

  test('Should not return validation error if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
