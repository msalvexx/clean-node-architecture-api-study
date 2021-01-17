export interface UpdateAccessTokenModel {
  id: string
  token: string
}

export interface UpdateAccessTokenRepository {
  updateAccessToken: (updateAccessTokenModel: UpdateAccessTokenModel) => Promise<void>
}
