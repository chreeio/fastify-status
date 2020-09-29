import { Status } from './Status'

export interface HealthcheckFunction {
  (): Promise<Status>
}
