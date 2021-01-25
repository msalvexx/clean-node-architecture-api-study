import { ValidationError } from './validation-error'

export class MissingParameterError extends ValidationError {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParameterError'
  }
}
