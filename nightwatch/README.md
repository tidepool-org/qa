# Nightwatch Tests

Functional QA tests for Blip using Nightwatch.

## Getting started

After cloning this repository to your local machine, first make sure that
you have a version of `npm` that is recent enough - at least `3.x`. We are
using node `6.10.x` for our engine, and a `3.x` version of `npm` does
**not** get installed by default if you are installing node `0.12.x` through
a mechanism like [`nvm`](https://github.com/creationix/nvm 'nvm'). In this
case, you will need to manually update with:

```bash
$ npm install -g npm
```

Next, install Nightwatch and it's dependencies:

```bash
$ npm install
```

## Specifying the Blip environment

When running a Nightwatch test or test suite, you must first load in
environmental variables. Please contact someone at Tidepool to request
access to the environmental variables. Nightwatch tests will run on all
of Tidepool's environments: development (dev), staging (stg),
integration (int), production (prd), and local environments.

PLEASE NOTE: If you are going to run tests locally, you will need to
start a local copy of blip.

## Specifying the runtime environment

The default test settings are specified in nightwatch.conf.js. There are
also two other environments that can be specified: "debug" and "captureScreens."
The following syntax is used to specify the environment:

```bash
$ nightwatch tests -e debug
```

The "debug" environment can be used to recreate random variables, which 
may be useful for debugging failed tests. You can specify the random seed
in the nightwatch.conf.js file, and you can find the random seed that 
corresponds to the failed test by grabbing the time stamp of the failed test,
which is located here: /nightwatch/screenshots/failed/YYYYMMDDTHH.mm.ss.SSS

The "captureScreens" environment can be used to capture key page states 
during the initial test-build, and can/should be used for debugging purposes.
For example, if a test breaks the initial and periodic screen captures can be
compared to the broken test screenshots. These screenshots are stored in the
nightwatch/screenshots/detailed/ folder.

```bash
$ nightwatch tests -e captureScreens
```

## Saving screenshots

Screenshots will also be captured if a test fails, as specified in the
nightwatch.conf.js file. Failed tests are stored in the
nightwatch/screenshots/failed/ folder. NOTE: This functionality
is different than the saveScreenshots variable and pauseAndSaveScreenshot
function that you will find in most tests.

## Examples

Here is an example of how to run a test:

```bash
$ nightwatch tests/loginViewData.js
```

You can also run all of the tests in the nightwatch test folder:

```bash
$ nightwatch tests
```

You can also run tests in parallel. This example will start three
instances of the test suite using the default environment:

```bash
$ nightwatch tests -e default,default,default
```

## Test name convention and key

The following abbreviations are used to shorten the test names:

| Abbreviation  | Means  |
|---|---|
| "_" | here the underscore stands for "and" | 
| DSA | data storage account |
| VCA  | verified clinician account |
| TOS  | terms of service  |
