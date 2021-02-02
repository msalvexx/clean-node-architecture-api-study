import { DbLoadSurveys } from './db-load-surveys'
import { Survey, LoadSurveysRepository } from './db-load-surveys.protocols'
import MockDate from 'mockdate'

export type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeFakeSurveys = (): Survey[] => {
  return [{
    question: '1_any_question',
    answers: [{
      answer: '1_any_answer'
    }],
    date: new Date()
  },
  {
    question: '2_any_question',
    answers: [{
      answer: '2_any_answer'
    }],
    date: new Date()
  }]
}

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<Survey[]> {
      return Promise.resolve(makeFakeSurveys())
    }
  }
  return new LoadSurveysRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository.loadAll', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return surveys on success', async () => {
    const { sut } = makeSut()
    const result = await sut.load()
    expect(result).toStrictEqual(makeFakeSurveys())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
