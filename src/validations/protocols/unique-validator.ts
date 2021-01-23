export interface UniqueValidator {
  isUnique: (data: any) => Promise<boolean> | boolean
}
