import { LoadSurveys, Survey } from './load-surveys-controller.protocols'
import { LoadSurveysController } from './load-surveys-controller'
import { noContent, ok } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'

type SutTypes = {
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys.load', async () => {
    const { sut, loadSurveyStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return the surveys on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({})
    expect(result).toStrictEqual(ok(makeFakeSurveys()))
  })

  test('Should return 204 when no survey is founded', async () => {
    const { sut, loadSurveyStub } = makeSut()
    jest.spyOn(loadSurveyStub, 'load').mockResolvedValueOnce([])
    const result = await sut.handle({})
    expect(result).toStrictEqual(noContent())
  })

  test('Should throw if LoadSurveys.load usecase throws', async () => {
    const { sut, loadSurveyStub } = makeSut()
    jest.spyOn(loadSurveyStub, 'load').mockRejectedValueOnce(new Error())
    const promise = sut.handle({})
    await expect(promise).rejects.toThrowError()
  })
})
