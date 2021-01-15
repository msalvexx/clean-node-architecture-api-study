export class NotFoundModelError extends Error {
  constructor (modelName: string) {
    super(`The model could not be found: ${modelName}`)
    this.name = 'NotFoundModelError'
  }
}
