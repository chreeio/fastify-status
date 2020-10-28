import { CustomPropertyObject } from './CustomProperty'
import { HealthcheckFunction } from './HealthcheckFunction'
import { OverallStatusCalculatorFunction } from './OverallStatusCalculatorFunction'
import { FailingStatusRequestHook } from './FailingStatusRequestHook'

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
    overallStatusCalculator: OverallStatusCalculatorFunction
  }>
  failingStatusRequestHook: FailingStatusRequestHook
  version: Record<string, string>
  customProperties: CustomPropertyObject
}
