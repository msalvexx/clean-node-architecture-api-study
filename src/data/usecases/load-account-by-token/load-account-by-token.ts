import { AccessDeniedError } from "../../../domain/errors/access-denied-error";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials-error";
import { Account } from "../../../domain/models/account";
import { LoadAccountByToken } from "../../../domain/usecases/load-account-by-token";
import { Decrypter } from "../../protocols/criptography/decrypter";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) { }

  async load (accessToken: string, role?: string): Promise<Account> {
    try {
      await this.decrypter.decrypt(accessToken)
    } catch (e) {
      if (e instanceof InvalidCredentialsError) {
        throw new AccessDeniedError()
      }
    }
    return null
  }
}
