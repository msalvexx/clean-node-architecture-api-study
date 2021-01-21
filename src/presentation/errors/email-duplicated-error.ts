import { ValidationError } from './validation-error'

export class AttributeDuplicatedError extends ValidationError {
  constructor (fieldName: string) {
    super(`Attribute already exists: ${fieldName}`)
    this.name = 'EmailDuplicatedError'
  }
}
