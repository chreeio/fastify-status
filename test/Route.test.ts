import 'jest'

import fastifyStatus from '../src'

import { createNewApp } from './Common'

describe('Route Checks', () => {
  test('By default, there is no status endpoint exposed.', async () => {
    // Given
    const app = createNewApp()
    await app.register(fastifyStatus)

    // When
    const response = await app.inject({
        method: 'GET',
        url: '/status',
    })

    // Then
    expect(response.statusCode).toBe(404)

    await app.close()
  })

  test('If the route is exposed, it is registered on /status by default.', async () => {
    // Given
    const app = createNewApp()
    await app.register(fastifyStatus, {
        route: {
            expose: true
        }
    })

    // When
    const response = await app.inject({
      method: 'GET',
      url: '/status',
    })

    // Then
    expect(response.statusCode).toBe(200)

    await app.close()
  })

  test('The status route can be customized.', async () => {
    // Given
    const customStatusPath = '/custom/status'
    const app = createNewApp()
    await app.register(fastifyStatus, {
        route: {
            expose: true,
            path: customStatusPath
        }
    })

    // When
    const responseOnCustomPath = await app.inject({
      method: 'GET',
      url: customStatusPath,
    })
    const responseOnDefaultPath = await app.inject({
        method: 'GET',
        url: '/status',
    }) 

    // Then
    expect(responseOnCustomPath.statusCode).toBe(200)
    expect(responseOnDefaultPath.statusCode).toBe(404)

    await app.close()
  })
})
