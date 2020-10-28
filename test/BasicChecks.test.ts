import 'jest'

import fastifyStatus from '../src'

import { createNewApp } from './Common'

describe('Basic Checks', () => {
  test('Fastify Status can be registered without errors.', async () => {
    // Given
    const app = createNewApp()

    // Expect
    await app.register(fastifyStatus)

    await app.close()
  })
})
