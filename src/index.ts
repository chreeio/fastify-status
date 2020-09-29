import fp from 'fastify-plugin'

import FastifyStatus from './FastifyStatus'

export * from './CustomProperty'
export * from './FastifyStatusOptions'
export * from './HealthcheckFunction'
export * from './Status'
export * from './StatusCheckerFunction'

export default fp(FastifyStatus, {
  name: 'fastify-status',
})
