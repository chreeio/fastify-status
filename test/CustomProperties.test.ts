import 'jest'

import fastifyStatus from '../src'

import { createNewApp } from './Common'

describe('Custom Properties', () => {
  test('When provided, custom properties are correctly resolved.', async () => {
    // Given
    const app = createNewApp()
    await app.register(fastifyStatus, {
      route: {
        expose: true,
      },
      customProperties: {
        literal: 'Hello, World!',
        object: {},
        array: [],
        fn: () => 12,
      },
    })

    // When
    const response = await app.inject({
      method: 'GET',
      url: '/status',
    })

    const body = JSON.parse(response.body)

    // Then
    expect(body.literal).toBe('Hello, World!')
    expect(body.object).toStrictEqual({})
    expect(body.array).toStrictEqual([])
    expect(body.fn).toBe(12)

    await app.close()
  })
})
