import { AssertAccountExistsByEmailRepository } from '../../../../../data/usecases/authentication/db-authentication.protocols'
import { UniqueEmailValidation } from './unique-validation'

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
})
