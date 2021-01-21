import { ValidationError } from './validation-error'

export class EmailDuplicatedError extends ValidationError {
  constructor (email: string) {
    super(`Email already exists: ${email}`)
    this.name = 'EmailDuplicatedError'
  }
}
