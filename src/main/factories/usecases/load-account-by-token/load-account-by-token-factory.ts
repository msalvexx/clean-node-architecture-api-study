import { DbLoadAccountByToken } from '../../../../data/usecases/load-account-by-token/load-account-by-token'
import { LoadAccountByToken } from '../../../../domain/usecases/load-account-by-token'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const decrypter = new JwtAdapter(env.jwtSecret)
  const addAccountRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(decrypter, addAccountRepository)
}
