import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { BCryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const accountRepository = new AccountMongoRepository()
  const salt = 12
  const hashComparer = new BCryptAdapter(salt)
  const token = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountRepository, hashComparer, token, accountRepository)
}
