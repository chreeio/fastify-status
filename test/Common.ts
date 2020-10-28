import fastify, { FastifyInstance } from 'fastify'

export function createNewApp(): FastifyInstance {
  return fastify({
    logger: {
      level: 'debug',
      prettyPrint: true,
    },
  })
}

export const HELLO_METHOD = 'GET'
export const HELLO_PATH = '/hello'

export function createNewAppWithHelloEndpoint(): FastifyInstance {
    const app = createNewApp()

    app.route({
        method: HELLO_METHOD,
        url: HELLO_PATH,
        async handler(_request, reply) { reply.code(204) }
    })

    return app
}

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}
