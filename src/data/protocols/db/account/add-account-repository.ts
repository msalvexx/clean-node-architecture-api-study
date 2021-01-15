import { Account } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

export interface AddAccountRepository {
  add: (accountModel: AddAccountModel) => Promise<Account>
}
