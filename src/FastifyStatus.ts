import { CustomPropertyObject } from './CustomProperty'
import { FailingStatusRequestHook } from './FailingStatusRequestHook'
import { FastifyStatusOptions } from './FastifyStatusOptions'
import { Status } from './Status'
import { OverallStatusCalculatorFunction } from './OverallStatusCalculatorFunction'

const DEFAULT_STATUS_PATH = '/status'
const SERVICE_UNAVAILABLE = 503
const OK = 200

const DEFAULT_FAILING_STATUS_REQUEST_HOOK: FailingStatusRequestHook = async function defaultFailingStatusRequestHook(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reply: any
) {
  request.log.warn('Cannot serve request because the service is failing.')
  reply.code(SERVICE_UNAVAILABLE)

  throw new Error('Service Unavailable')
}

const DEFAULT_OVERALL_STATUS_CALCULATOR: OverallStatusCalculatorFunction = function defaultOverallStatusCalculator(
  healthcheckResults: Record<string, Status>
): Promise<Status> {
  let overallStatus = Status.OK
  for (const status of Object.values(healthcheckResults)) {
    if (status == Status.FAILING) {
      return Promise.resolve(Status.FAILING)
    } else if (status == Status.DEGRADED) {
      overallStatus = Status.DEGRADED
    }
  }

  return Promise.resolve(overallStatus)
}

interface State {
  status: Status
  health: Record<string, Status>
  version: Record<string, string>
  [key: string]: unknown
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export default function FastifyStatus(fastify: any, options: Partial<FastifyStatusOptions>, next: any): void {
  const state: Partial<State> = {
    version: options.version,
    startedAt: startedAt(),
  }

  const shouldExposeRoute = options.route?.expose
  const routePath = options.route?.path || DEFAULT_STATUS_PATH
  const failingStatusRequestHook = options.failingStatusRequestHook || DEFAULT_FAILING_STATUS_REQUEST_HOOK
  const overallStatusCalculator = options.health?.overallStatusCalculator || DEFAULT_OVERALL_STATUS_CALCULATOR

  if (shouldExposeRoute) {
    exposeStatusEndpoint()
  }

  let healthcheckTimer: NodeJS.Timeout | undefined
  if (options.health?.updateInterval) {
    healthcheckTimer = setInterval(performHealthcheck, options.health.updateInterval)

    fastify.addHook('onClose', onClose)

    fastify.addHook('onRequest', onRequest)
  }

  next()

  function exposeStatusEndpoint() {
    fastify.log.info('Exposing Fastify Status at %s', routePath)

    const customOptions = options.route?.customOptions || {}

    fastify.route({
      ...customOptions,
      method: 'GET',
      url: routePath,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async handler(request: any, reply: any) {
        request.log.info('Fastify Status endpoint called.')

        if (!options.health?.updateInterval || !state.status) {
          await performHealthcheck()
        }

        if (options.customProperties) {
          await resolveCustomProperties()
        }

        state.uptime = uptime()

        reply.code(OK).send(state)
      },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onRequest(request: any, reply: any) {
    if (state.status === Status.FAILING) {
      if (!shouldExposeRoute || request.url !== routePath) {
        await failingStatusRequestHook(request, reply)
      }
    }
  }

  function uptime() {
    return Math.floor(process.uptime())
  }

  function startedAt() {
    const currentSeconds = Math.floor(Date.now() / 1000)

    const startedSeconds = currentSeconds - uptime()

    return new Date(startedSeconds * 1000)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onClose(_fastify: any, done: any) {
    if (healthcheckTimer) {
      clearInterval(healthcheckTimer)
    }

    done()
  }

  async function performHealthcheck() {
    fastify.log.info('Fastify Status is performing healthchecks.')

    const checks = options.health?.checks || {}

    const result: Record<string, Status> = {}

    for (const checkName of Object.keys(checks)) {
      try {
        result[checkName] = await checks[checkName]()
      } catch {
        result[checkName] = Status.FAILING
      }
    }

    state.status = await overallStatusCalculator(result)

    fastify.log.info('Fastify Status healthcheck finished, status: %s', state.status)

    state.health = result
  }

  async function resolveCustomProperties() {
    const result: Record<string, unknown> = {}

    await (async function recursivePropertyResolution(target: Record<string, unknown>, source: CustomPropertyObject) {
      for (const key of Object.keys(source)) {
        const value = source[key]

        if (typeof value == 'function') {
          target[key] = await value()
        } else if (Array.isArray(value) || typeof value !== 'object') {
          target[key] = value
        } else {
          target[key] = {}

          await recursivePropertyResolution(target[key] as Record<string, unknown>, source[key] as CustomPropertyObject)
        }
      }
    })(result, options.customProperties || {})

    Object.keys(result).forEach((k) => (state[k] = result[k]))
  }
}
