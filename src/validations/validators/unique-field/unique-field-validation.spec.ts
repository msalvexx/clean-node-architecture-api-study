import { AttributeDuplicatedError } from '../../../presentation/errors'
import { UniqueValidator } from '../../protocols'
import { UniqueFieldValidation } from './unique-field-validation'

interface SutTypes {
  sut: UniqueFieldValidation
  uniqueValidatorStub: UniqueValidator
}

const makeUniqueValidator = (): UniqueValidator => {
  class UniqueValidatorStub implements UniqueValidator {
    isUnique (data: any): Promise<boolean> | boolean {
      return Promise.resolve(true)
    }
  }
  return new UniqueValidatorStub()
}

const makeSut = (): SutTypes => {
  const uniqueValidatorStub = makeUniqueValidator()
  const sut = new UniqueFieldValidation(['email', 'name', 'phonenumber'], uniqueValidatorStub)
  return {
    sut,
    uniqueValidatorStub
  }
}

describe('UniqueEmailValidation', () => {
  test('Should call AssertAccountExistsByEmailRepository exists with correct values', async () => {
    const { sut, uniqueValidatorStub } = makeSut()
    const existsSpy = jest.spyOn(uniqueValidatorStub, 'isUnique')
    await sut.validate({ email: 'any@mail.com', name: 'any_name' })
    expect(existsSpy).toBeCalledWith({ email: 'any@mail.com', name: 'any_name' })
  })

  test('Should return EmailDuplicatedError if email exists', async () => {
    const { sut, uniqueValidatorStub } = makeSut()
    jest.spyOn(uniqueValidatorStub, 'isUnique').mockResolvedValueOnce(false)
    const promise = sut.validate({ email: 'any@mail.com', name: 'any_name' })
    await expect(promise).rejects.toThrowError(new AttributeDuplicatedError(['email', 'name']))
  })

  test('Should return nothing if email not exists', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ email: 'any@mail.com' })
    expect(result).toBeFalsy()
  })

  test('Should throw if AssertAccountExistsByEmailRepository throws', async () => {
    const { sut, uniqueValidatorStub } = makeSut()
    jest.spyOn(uniqueValidatorStub, 'isUnique').mockRejectedValueOnce(new Error())
    const promise = sut.validate({ email: 'any@mail.com' })
    await expect(promise).rejects.toThrow()
  })
})
