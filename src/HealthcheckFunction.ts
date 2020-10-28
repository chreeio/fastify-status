import { Status } from './Status'

/**
 * Function providing the current health status of an arbitrary service.
 */
export interface HealthcheckFunction {
  (): Promise<Status>
}
