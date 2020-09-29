import { Status } from './Status'

export interface StatusCheckerFunction {
  (healthcheckResults: Record<string, Status>): Promise<Status>
}
