import { badRequest, ok, serverError } from '../../../presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { Account } from '../../../domain/models/account'
import { DefaultErrorControllerDecorator } from './error'
import { ValidationError } from '../../../presentation/errors/validation-error'

interface SutTypes {
  sut: DefaultErrorControllerDecorator
  controllerStub: Controller
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(ok(makeFakeAccount())))
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const sut = new DefaultErrorControllerDecorator(controllerStub)
  return { sut, controllerStub }
}

const makeFakeAccount = (): Account => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('Controller Decorator', () => {
  test('Should call default controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should return bad request if controller throws any validation error', async () => {
    const { sut, controllerStub } = makeSut()
    const error = new ValidationError()
    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  test('Should return server error if controller throws any other error', async () => {
    const { sut, controllerStub } = makeSut()
    const error = new Error()
    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
