import { ValidationError } from './validation-error'

export class InvalidParameterError extends ValidationError {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParameterError'
  }
}
