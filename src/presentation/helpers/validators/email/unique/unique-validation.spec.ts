import { AssertAccountExistsByEmailRepository } from '../../../../../data/usecases/authentication/db-authentication.protocols'
import { UniqueEmailValidation } from './unique-validation'
import { AttributeDuplicatedError } from '../../../../errors/email-duplicated-error'

interface SutTypes {
  sut: UniqueEmailValidation
  repo: AssertAccountExistsByEmailRepository
}

const makeAssertAccountExistsByEmailRepository = (): AssertAccountExistsByEmailRepository => {
  class AssertAccountExistsByEmailRepositoryStub implements AssertAccountExistsByEmailRepository {
    async exists (email: string): Promise<boolean> {
      return new Promise(resolve => resolve(false))
    }
  }
  return new AssertAccountExistsByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const repo = makeAssertAccountExistsByEmailRepository()
  const sut = new UniqueEmailValidation('email', repo)
  return {
    sut,
    repo
  }
}

describe('UniqueEmailValidation', () => {
  test('Should call AssertAccountExistsByEmailRepository exists with correct values', async () => {
    const { sut, repo } = makeSut()
    const existsSpy = jest.spyOn(repo, 'exists')
    await sut.validate({ email: 'any@mail.com' })
    expect(existsSpy).toBeCalledWith('any@mail.com')
  })

  test('Should return EmailDuplicatedError if email exists', async () => {
    const { sut, repo } = makeSut()
    jest.spyOn(repo, 'exists').mockResolvedValueOnce(true)
    const promise = sut.validate({ email: 'any@mail.com' })
    await expect(promise).rejects.toThrowError(new AttributeDuplicatedError('email'))
  })

  test('Should return nothing if email not exists', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ email: 'any@mail.com' })
    expect(result).toBeFalsy()
  })

  test('Should throw if AssertAccountExistsByEmailRepository throws', async () => {
    const { sut, repo } = makeSut()
    jest.spyOn(repo, 'exists').mockRejectedValueOnce(new Error())
    const promise = sut.validate({ email: 'any@mail.com' })
    await expect(promise).rejects.toThrow()
  })
})
