export interface UpdateAccessTokenModel {
  id: string
  token: string
}

export interface UpdateAccessTokenRepository {
  update: (updateAccessTokenModel: UpdateAccessTokenModel) => Promise<void>
}
