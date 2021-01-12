import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { LogControllerDecorator } from './log'

class ControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpReponse: HttpResponse = {
      statusCode: 200,
      body: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    return new Promise(resolve => resolve(httpReponse))
  }
}

describe('Log decorator', () => {
  test('Should call controller handle', async () => {
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
