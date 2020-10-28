import 'jest'

import fastifyStatus, { Status } from '../src'

import { createNewAppWithHelloEndpoint, delay, HELLO_METHOD, HELLO_PATH } from './Common'

describe('Failing Status Request Hook', () => {
  test('By default, if no update interval is set, then the hook is not executed.', async () => {
    // Given
    const app = createNewAppWithHelloEndpoint()
    const failingStatusRequestHook = jest.fn()
    await app.register(fastifyStatus, {
        failingStatusRequestHook
    })

    // When
    await app.inject({
        method: HELLO_METHOD,
        url: HELLO_PATH
    })

    // Then
    expect(failingStatusRequestHook).toBeCalledTimes(0);

    await app.close()
  })

  test('By default, if an update interval is set, and the status is failing, then 503 is returned.', async () => {
    // Given
    const app = createNewAppWithHelloEndpoint()
    await app.register(fastifyStatus, {
        route: {
            expose: true
        },
        health: {
            updateInterval: 500,
            async overallStatusCalculator() {
                return Status.FAILING
            }
        }
    })

    // When
    await delay(750)
    const response = await app.inject({
        method: HELLO_METHOD,
        url: HELLO_PATH
    })

    // Then
    expect(response.statusCode).toBe(503);

    await app.close()
  })

  test('If an update interval is set, and the status is failing, then the custom hook is executed.', async () => {
    // Given
    const app = createNewAppWithHelloEndpoint()
    const failingStatusRequestHook = jest.fn(() => Promise.resolve())
    await app.register(fastifyStatus, {
        route: {
            expose: true
        },
        health: {
            updateInterval: 500,
            async overallStatusCalculator() {
                return Status.FAILING
            }
        },
        failingStatusRequestHook
    })

    // When
    await delay(750)
    await app.inject({
        method: HELLO_METHOD,
        url: HELLO_PATH
    })

    // Then
    expect(failingStatusRequestHook).toBeCalledTimes(1);

    await app.close()
  })
})
