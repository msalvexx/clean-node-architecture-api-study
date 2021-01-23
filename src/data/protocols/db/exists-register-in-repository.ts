export interface ExistsRegisterInRepository {
  exists: (data: any) => Promise<boolean>
}
