import { Status } from './Status'

/**
 * Function calculating the overall health of the service from the
 * supplied, smaller health check results.
 */
export interface OverallStatusCalculatorFunction {
  (healthcheckResults: Record<string, Status>): Promise<Status>
}
