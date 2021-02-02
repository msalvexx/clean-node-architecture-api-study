import { MissingParameterError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<void> {
      return new Promise(resolve => resolve(null))
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
  test('Should return validation error if any validation fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new MissingParameterError('field'))))
    const promise = sut.validate({ field: 'any_value' })
    await expect(promise).rejects.toThrow(new MissingParameterError('field'))
  })

  test('Should not return validation error if validation succeeds', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
