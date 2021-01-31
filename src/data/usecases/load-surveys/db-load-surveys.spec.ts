import { DbLoadSurveys } from './db-load-surveys'
import { Survey, LoadSurveysRepository } from './db-load-surveys.protocols'

export interface SutTypes {
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
    async load (): Promise<Survey[]> {
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
  test('Should call LoadSurveysRepository.load', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })
})
