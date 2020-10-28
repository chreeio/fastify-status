import { Status } from './Status'

export interface OverallStatusCalculatorFunction {
  (healthcheckResults: Record<string, Status>): Promise<Status>
}
