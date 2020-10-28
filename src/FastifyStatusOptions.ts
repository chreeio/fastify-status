import { CustomPropertyObject } from './CustomProperty'
import { HealthcheckFunction } from './HealthcheckFunction'
import { OverallStatusCalculatorFunction } from './OverallStatusCalculatorFunction'
import { FailingStatusRequestHook } from './FailingStatusRequestHook'

/**
 * Options interface to configure Fastify Status.
 */
export interface FastifyStatusOptions {
  /**
   * Options related to the HTTP endpoint exposed by Fastify Status.
   */
  route: Partial<{
    /**
     * Whether to expose an HTTP endpoint serving status information or not. Set to `false` by default.
     */
    expose: boolean

    /**
     * The path of the HTTP status endpoint. Set to `/status` by default.
     */
    path: string

    /**
     * Additional customization for the HTTP status endpoint. Please refer to
     * https://www.fastify.io/docs/latest/Routes/#routes-option regarding the
     * permitted HTTP route options.
     */
    customOptions: Record<string, unknown>
  }>

  /**
   * Options related to health checks.
   */
  health: Partial<{
    /**
     * The interval between subsequent health checks in milliseconds. If not set, then health checks
     * will be performed on each request to the exposed status endpoint. By default, this setting is
     * not set.
     */
    updateInterval: number | undefined

    /**
     * An arbitrary number of custom health checks. If an update interval is set, then these checks will
     * be scheduled. Otherwise, they are executed on each request to the status endpoint.
     */
    checks: Record<string, HealthcheckFunction>

    /**
     * A function calculating the overall health of the service using the values provided by the `checks`.
     * By default, this function sets the overall health to `failing` if there's a `failing` check and
     * `degraded` if there's a `degraded` check.
     */
    overallStatusCalculator: OverallStatusCalculatorFunction
  }>

  /**
   * A Fastify onRequest hook (https://www.fastify.io/docs/latest/Hooks/#onrequest) which is executed on
   * each request if the current overall health of the service is `failing`.
   *
   * By default, this hook will return `503 - Service Unavailable` to every request.
   */
  failingStatusRequestHook: FailingStatusRequestHook

  /**
   * A string to string mapping of version information.
   */
  version: Record<string, string>

  /**
   * Any additional custom properties. These are going to be appended to the response of the status endpoint.
   */
  customProperties: CustomPropertyObject
}
