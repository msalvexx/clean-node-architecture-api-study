export interface AssertAccountExistsByEmailRepository {
  exists: (email: string) => Promise<boolean>
}
