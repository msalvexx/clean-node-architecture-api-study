export class InvalidTokenError extends Error {
  constructor (stack: string) {
    super('Invalid token')
    this.name = 'InvalidTokenError'
    this.stack = stack
  }
}
