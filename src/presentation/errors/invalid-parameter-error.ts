export class InvalidParameterError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamenterError'
  }
}
