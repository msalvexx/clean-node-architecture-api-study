import { HttpRequest, Validation, MissingParameterError, ValidationError, AddSurvey, AddSurveyModel } from './add-survey-controller.protocols'
import { AddSurveyController } from './add-survey-controller'
import { noContent } from '../../../helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ]
  }
})

interface SutTypes {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<void> {
      return Promise.resolve(null)
    }
  }
  return new ValidationStub()
}

const makeAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<void> {
      return Promise.resolve(null)
    }
  }
  return new AddSurveyStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addSurveyStub = makeAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)
  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('Add Survey', () => {
  test('Should call validators with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = makeFakeRequest()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should throw ValidationError if validation throws ValidationError', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest.spyOn(validationStub, 'validate').mockRejectedValueOnce(new MissingParameterError('any_param'))
    const promise = sut.handle(httpRequest)
    await expect(promise).rejects.toThrowError(ValidationError)
  })

  test('Should throw if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest.spyOn(validationStub, 'validate').mockRejectedValueOnce(new Error())
    const promise = sut.handle(httpRequest)
    await expect(promise).rejects.toThrowError(Error)
  })

  test('Should call addSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const httpRequest = makeFakeRequest()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should throw if validation throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest.spyOn(addSurveyStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.handle(httpRequest)
    await expect(promise).rejects.toThrowError(Error)
  })

  test('Should return created on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const result = await sut.handle(httpRequest)
    expect(result).toStrictEqual(noContent())
  })
})
