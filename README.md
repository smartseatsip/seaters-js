# Seaters SDK

## Prerequisites

TODO

## Installation

TODO

## Build

To build a production package, run `gulp build`.

## Test

TODO

## Linting

To ensure code quality, all linter errors should be fixed prior to committing code.
`gulp build` will fail if there are still errors.

- Typescript
  - Run `npm run tslint` to lint without type checking, and `npm run tslint-types` with type checking
  - Run respectively `npm run tslint-watch` and `npm run tslint-types-watch` to run the linter with a watcher. This means the linter will re-run when code is changed.
- Javascript
  - Run `npm run eslint` to lint
  - Run `npm run eslint-watch` to run the linter with a watcher. This means the linter will re-run when code is changed.
