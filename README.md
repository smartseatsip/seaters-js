# Seaters SDK

## Installation

The SDK is published as an NPM package. Run `npm install seaters --save` to install it.

## Serve

To serve a package, install the dependencies first using $ `npm install`, then run $ `npm run serve`.

## Build

To build a production package, install the dependencies first using $ `npm install`, then run $ `npm run build`.

## Documentation

Typedoc documentation is automatically generated in the doc/ folder

## Testing a local copy of the SDK in other apps

To test the SDK in your app:

- `npm run serve` the SDK locally, so the SDK is re-compiled whenever something is changed
- Create a symbolic link from the SDK's bundle to the desired location
  - `ln /path/to/sdk/dist/seaters.bundle.js /path/to/your/app/seaters.bundle.js`
  - Any changes to seaters.bundle.js are now updated in your app

This way you don't have to publish the SDK to test it.
