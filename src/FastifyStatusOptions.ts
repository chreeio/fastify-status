import { CustomPropertyObject } from './CustomProperty'
import { HealthcheckFunction } from './HealthcheckFunction'
import { StatusCheckerFunction } from './StatusCheckerFunction'

export interface FastifyStatusOptions {
  route: Partial<{
    expose: boolean
    path: string
    customOptions: Record<string, unknown>
  }>
  health: Partial<{
    updateInterval: number | undefined
    unavailableWhenFailing: boolean
    checks: Record<string, HealthcheckFunction>
    statusChecker: StatusCheckerFunction
  }>
  version: Record<string, string>
  customProperties: CustomPropertyObject
}
