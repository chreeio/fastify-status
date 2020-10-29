# fastify-status

[![Build Master status](https://github.com/chreeio/fastify-status/workflows/Build%20Master/badge.svg)](https://github.com/chreeio/fastify-status/actions?query=workflow%3A%22Build+Master%22)
[![npm version](https://img.shields.io/npm/v/@chreeio/fastify-status)](https://www.npmjs.com/package/@chreeio/fastify-status)
[![LICENCE](https://img.shields.io/github/license/chreeio/fastify-status)](LICENSE)

[Fastify](https://www.fastify.io/) plugin exposing overall server status: version, health and custom data.

## Installation

~~~~
npm i @chreeio/fastify-status
~~~~

## Features

  * HTTP endpoint serving overall health, custom health checks, version and custom properties.
    * Can be turned off.
    * Customizable path and [Fastify route options](https://www.fastify.io/docs/latest/Routes/#full-declaration).
  * Three-valued (`ok`, `degraded`, `failing`) overall health calculated from custom health checks.
  * Health checks can execute scheduled or on-demand when service status is requested via HTTP.
  * Customizable [Fastify onRequest hook](https://www.fastify.io/docs/latest/Hooks/#onrequest) executed when the overall health is `failing`.

## Usage

Simply import the plugin and register it:

~~~~TypeScript
import fastify from 'fastify'
import fastifyStatus from '@chreeio/fastify-status'

const app = fastify()

app.register(fastifyStatus, {
  route: {
    expose: true,
  },
})
~~~~

Please take a look at the [test](test) folder for more involved examples.

## Options

When registering `fastify-status`, you can set the following options. Please note, that each setting is optional.

  * **route.expose**
    * Whether to expose an HTTP endpoint serving status information or not. Set to `false` by default.
  * **route.path**
    * The path of the HTTP status endpoint. Set to `/status` by default.
  * **route.customOptions**
    * Additional customization for the HTTP status endpoint. Please refer to https://www.fastify.io/docs/latest/Routes/#routes-option regarding the permitted HTTP route options.
  * **health.updateInterval**
    * The interval between subsequent health checks in milliseconds. If not set, then health checks will be performed on each request to the exposed status endpoint. By default, this setting is not set.
  * **health.checks**
    * An arbitrary number of custom health checks. If an update interval is set, then these checks will be scheduled. Otherwise, they are executed on each request to the status endpoint.
  * **health.overallStatusCalculator**
    * A function calculating the overall health of the service using the values provided by the `checks`. By default, this function sets the overall health to `failing` if there's a `failing` check and `degraded` if there's a `degraded` check.
  * **failingStatusRequestHook**
    * A Fastify onRequest hook (https://www.fastify.io/docs/latest/Hooks/#onrequest) which is executed on each request if the current overall health of the service is `failing`. Note, that this hook is only registered if there's an update interval set for the health checks. By default, this hook will return `503 - Service Unavailable` to every request.
  * **version**
    * A string to string mapping of version information.
  * **customProperties**
    * Any additional custom properties. These are going to be appended to the response of the status endpoint.

## Acknowledgements

This is an open source project maintained by [Chree](https://chree.io). For more projects maintained or supported by Chree, please head over to the [Chree Open Source page](https://opensource.chree.io).

## Licence

This package is licensed under [MIT](LICENSE).
