/**
 * A Fastify onRequest hook (https://www.fastify.io/docs/latest/Hooks/#onrequest) which is executed on
 * each request if the current overall health of the service is `failing`.
 */
export interface FailingStatusRequestHook {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (request: any, reply: any, next: any): void
}
