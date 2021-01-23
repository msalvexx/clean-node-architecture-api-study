import { ValidationError } from './validation-error'

export class AttributeDuplicatedError extends ValidationError {
  constructor (fieldName: string[]) {
    super(`Attribute(s) already registered: ${fieldName.join(', ')}`)
    this.name = 'AttributeDuplicatedError'
  }
}
