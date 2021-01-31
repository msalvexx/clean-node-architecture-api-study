import { LoadSurveys, Survey } from './load-surveys-controller.protocols'
import { LoadSurveysController } from './load-surveys-controller'

interface SutTypes {
  sut: LoadSurveysController
  loadSurveyStub: LoadSurveys
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

const makeLoadSurveysStub = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<Survey[]> {
      return Promise.resolve(makeFakeSurveys())
    }
  }
  return new LoadSurveysStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveyStub)
  return {
    sut,
    loadSurveyStub
  }
}

describe('LoadSurveysController', () => {
  test('Should call LoadSurveys.load', async () => {
    const { sut, loadSurveyStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
