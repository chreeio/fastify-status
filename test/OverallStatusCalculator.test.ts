import 'jest'

import fastifyStatus, { Status } from '../src'

import { createNewApp } from './Common'

describe('Overall Status Calculator', () => {
  test('By default, the overall status should be degraded if there is a degraded service.', async () => {
    // Given
    const app = createNewApp()
    await app.register(fastifyStatus, {
        route: {
            expose: true
        },
        health: {
            checks: {
                ok: () => Promise.resolve(Status.OK),
                degraded: () => Promise.resolve(Status.DEGRADED)
            }
        },
    })

    // When
    const response = await app.inject({
        method: 'GET',
        url: '/status'
    })

    const body = JSON.parse(response.body)

    // Then
    expect(body.status).toBe(Status.DEGRADED)

    await app.close()
  })

  test('By default, the overall status should be failing if there is a failing service.', async () => {
    // Given
    const app = createNewApp()
    await app.register(fastifyStatus, {
        route: {
            expose: true
        },
        health: {
            checks: {
                ok: () => Promise.resolve(Status.OK),
                degraded: () => Promise.resolve(Status.DEGRADED),
                failing: () => Promise.resolve(Status.FAILING)
            }
        },
    })

    // When
    const response = await app.inject({
        method: 'GET',
        url: '/status'
    })

    const body = JSON.parse(response.body)

    // Then
    expect(body.status).toBe(Status.FAILING)

    await app.close()
  })

  test('The overall status should be failing if there is an error-throwing check.', async () => {
    // Given
    const app = createNewApp()
    await app.register(fastifyStatus, {
        route: {
            expose: true
        },
        health: {
            checks: {
                ok: () => Promise.reject(new Error()),
            }
        },
    })

    // When
    const response = await app.inject({
        method: 'GET',
        url: '/status'
    })

    const body = JSON.parse(response.body)

    // Then
    expect(body.status).toBe(Status.FAILING)

    await app.close()
  })
})
