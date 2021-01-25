export class AccessDeniedError extends Error {
  constructor (stack?: string) {
    super('Access Denied')
    this.name = 'AccessDeniedError'
    this.stack = stack
  }
}
