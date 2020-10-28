import fp from 'fastify-plugin'

import FastifyStatus from './FastifyStatus'

export * from './CustomProperty'
export * from './FailingStatusRequestHook'
export * from './FastifyStatusOptions'
export * from './HealthcheckFunction'
export * from './OverallStatusCalculatorFunction'
export * from './Status'

export default fp(FastifyStatus, {
  name: 'fastify-status',
})
