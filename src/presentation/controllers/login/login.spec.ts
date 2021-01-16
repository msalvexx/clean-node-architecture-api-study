import { ok, unauthorized } from '../../helpers/http/http-helper'
import { HttpRequest, InvalidCredentialsError, Authentication, AuthenticationModel, Validation } from './login.protocols'
import { LoginController } from './login'

interface SutTypes {
  sut: LoginController
  validationStub: Validation
  authenticationStub: Authentication
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): void {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (credentials: AuthenticationModel): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthenticationStub()
  const validationStub = makeValidationStub()
  const sut = new LoginController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authenticationSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authenticationSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should return 401 if Authentication throws unauthorized error', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new InvalidCredentialsError()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return access token if Authentication succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok('any_token'))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should throw if any dependency throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow()
  })
})
