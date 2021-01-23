import { ExistsRegisterInRepository } from '../../../data/protocols/db/exists-register-in-repository'
import { UniqueValidatorAdapter } from './unique-validator-adapter'

interface SutTypes {
  sut: UniqueValidatorAdapter
  repo: ExistsRegisterInRepository
}

const makeExistsRegisterRepository = (): ExistsRegisterInRepository => {
  class ExistsRegisterRepositoryStub implements ExistsRegisterInRepository {
    async exists (data: any): Promise<boolean> {
      return new Promise(resolve => resolve(false))
    }
  }
  return new ExistsRegisterRepositoryStub()
}

const makeSut = (): SutTypes => {
  const repo = makeExistsRegisterRepository()
  const sut = new UniqueValidatorAdapter(repo)
  return {
    sut,
    repo
  }
}

describe('UniqueValidatorAdapter', () => {
  test('Should call ExistsRegisterInRepository exists with correct values', async () => {
    const { sut, repo } = makeSut()
    const existsSpy = jest.spyOn(repo, 'exists')
    await sut.isUnique({ email: 'any@mail.com' })
    expect(existsSpy).toBeCalledWith({ email: 'any@mail.com' })
  })

  test('Should return false if email exists', async () => {
    const { sut, repo } = makeSut()
    jest.spyOn(repo, 'exists').mockResolvedValueOnce(true)
    const result = await sut.isUnique({ email: 'any@mail.com' })
    expect(result).toBeFalsy()
  })

  test('Should return nothing if email not exists', async () => {
    const { sut } = makeSut()
    const result = await sut.isUnique({ email: 'any@mail.com' })
    expect(result).toBeTruthy()
  })

  test('Should throw if AssertAccountExistsByEmailRepository throws', async () => {
    const { sut, repo } = makeSut()
    jest.spyOn(repo, 'exists').mockRejectedValueOnce(new Error())
    const promise = sut.isUnique({ email: 'any@mail.com' })
    await expect(promise).rejects.toThrow()
  })
})
