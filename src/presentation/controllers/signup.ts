import { MissingParameterError } from '../errors/missing-parameter-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParameterError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParameterError('email'))
    }

    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
