# Contributing to underdocs

First, the most important part: thanks for considering a contribution to fastify-status!

In this short document, you'll find some practical information regarding contributions to underdocs. The kind of accepted contributions, branching strategy, code style, how to setup the development environment and such. Adhering to these guidelines is cruical to keep things consistent and moving.

**Table of Contents**

  * [Accepted Contributions](#accepted-contributions)
    * [Security Vulnerabilities](#security-vulnerabilities)
    * [Bug Reports](#bug-reports)
    * [Feature Requests](#feature-requests)
    * [Pull Requests](#pull-requests)
    * [Support Questions](#support-questions)
  * [Creating a PR](#creating-a-pr)
    * [Organization Members](#organization-members)
    * [Non-Organization Users](#non-organization-users)
  * [Code Style](#code-style)
    * [TypeScript](#TypeScript)
    * [Commit Messages](#commit-messages)
    * [Branch Names](#branch-names)
  * [Setting Up the Environment](#setting-up-the-environment)
    * [System Dependencies](#system-dependencies)
    * [Build and Test](#build-and-test)

## Accepted Contributions

In what follows, a few notable forms of contribution are covered. However, we are looking for all kinds of contributions! Thus, do not hesitate to open an issue or PR, regardless of what you want to do!

### Security Vulnerabilities

If you think, that there is a security vulnerability in underdocs, then please let us know first before the public disclosure of the vulnerability.

Please drop one of the maintainers an email, or send it to **opensource@chree.io**.

### Bug Reports

Regarding bug reports, the most important thing is reproducibility:

  * Make sure to provide as much context as you can.
    * What you wanted to do. The exact steps of your workflow.
    * Your configuration file if possible.
    * What was the expected and the actual outcome.
    * Exact underdocs version (artifact version if necessary), OS, architecture, etc.

Also, before creating a new bug report in form of an issue, please check if this bug has already been reported. If so, then read through the appropriate thread and comment if you can add relevant information to the discussion.

Thank you!

### Feature Requests

Just as bug reports, feature requests are also welcome in this project! However, we prioritize in-house features during the development. Please keep this in mind before opening a new issue.

### Pull Requests

We cannot overstate how much you help by creating a pull request! Thank you!

Before creating a pull request though, make sure, that at least there is some corresponding feature request, bug or some issue or open one. You best bet is to pick up something with the `help wanted` or `good first issue` label.

## Support Questions

Please keep in mind, that support questions have the lowest priority among other issues. When it comes to personal support requests, please open a new issue in the issue tracker. Just make sure to stick a `question` label on it.

## Creating a PR

Once you have something to work on, just follow the steps below.

### Organization Members

  1. Create a new feature branch off the `master` branch.
  1. Develop your feature or patch and add tests if necessary.
  1. Update the documentation if necessary.
  1. Push the feature branch.
  1. Open a new pull request in underdocs. The title should be the title of the issue including the issue number. Make sure, to have a detailed description regarding what to look for.

### Non-Organization Users

  1. Create your own for of the repository.
  1. If you have a previous fork, please make sure to pull the latest changes.
  1. Create a new feature branch off the `master` branch.
  1. Develop your feature or patch and add tests if necessary.
  1. Update the documentation if necessary.
  1. Push the feature branch.
  1. Open a new pull request in underdocs. The title should be the title of the issue including the issue number. Make sure, to have a detailed description regarding what to look for.

## Code Style

### TypeScript

We lint and format TypeScript files with ESLint and Prettier. You can use the `lint` and the `lint:fix` scripts to invoke
the linter:

~~~~
pnpm run lint
~~~~

### Commit Messages

Commit messages follow the [Convetional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Branch Names

Branches must be named according to the following convention:

~~~~
#<issue number>-<lowercase title of the issue with hyphens>[-index if multiple branches are created]
~~~~

Examples:

  * `#17-some-issue`,
  * `#17-some-issue-2`,
  * `#123-you_may-include-2838-numbers`

Of course, this does not apply to persistent branches, such as `master` :smile:

## Setting up the Environment

### System Dependencies

Make sure, that you have the following components installed on your system:

  * [Node.js](https://nodejs.org) >= 14.
  * [pnpm](https://pnpm.js.org/) >= 5.0.0.

### Build and Test

First, make sure to install the Node dependencies using `pnpm`:

~~~~
pnpm i
~~~~

Then, you can build and test the library with the following commands:

~~~~
pnpm run build
pnpm run test
~~~~

You can also watch tests interactively using the

~~~~
pnpm run test:watch
~~~~

command.
