export class InvalidHashError extends Error {
  constructor () {
    super('Invalid hash')
    this.name = 'InvalidHashError'
  }
}
