# Nightwatch Tests

Functional QA tests of Blip using Nightwatch.

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

## Specifying the environment

When running a Nightwatch test or test suite, you must first load in
environmental variables. Please contact someone at Tidepool to request
access to the environmental variables. Nightwatch tests will run on all
of Tidepool's environments: development (dev), staging (stg),
integration (int), production (prd), and local environments.

PLEASE NOTE: If you are going to run tests locally, you will need to
start a local copy of blip.

Here is an example of how to run one test:

```bash
$ nightwatch tests/loginRememberNo.js
```

You can also run all of the tests in the nightwatch test folder:

```bash
$ nightwatch tests
```

## Saving screenshots

Screenshots are used in two ways:

1. Screenshots will be captured if a test fails, as specified in the
nightwatch.conf.js file. Failed tests are stored in the
nightwatch/screenshots/failed/ folder. NOTE: This functionality
is different than the saveScreenshots variable and pauseAndSaveScreenshot
function that you will find in most tests.

2. It may also be useful to periodically capture screenshots when the
tests are running properly. These screen captures can be used to capture
key page states during the initial test-build, and can/should be used
for debugging purposes. For example, if a test breaks the initial and
periodic screen captures can be compared to the broken test screenshots.
These screenshots are stored in the
nightwatch/screenshots/detailed/ folder. These screenshots
can be enabled by using the following flag/syntax:

```bash
$ nightwatch tests --env "captureScreens"
```

## Test name convention and key

The following abbreviations are used to shorten the test names:

| Abbreviation  | Means  |
|---|---|
| "_" | here the underscore stands for "and" | 
| DSAMe (DSANotMe) | set up a data storage account for me (or someone else)  |
| Email (EmailNo)  | do (or do not) verify email  |
| Login  | login to existing user  |
| Nav  | navigate from one page and to another page  |
| Remember (RememberNo)  | do (or do not) check the remember me checkbox  |
| Signup (18, 15, 12)  | Sign up a new user that is (>17, 13-17, or < 13) |
| 
