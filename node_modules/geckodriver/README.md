Geckodriver [![CI](https://github.com/webdriverio/driver/actions/workflows/ci.yml/badge.svg)](https://github.com/webdriverio/driver/actions/workflows/ci.yml) [![Audit](https://github.com/webdriverio/driver/actions/workflows/audit.yml/badge.svg)](https://github.com/webdriverio/driver/actions/workflows/audit.yml)
==========

An npm wrapper for Mozilla's [Geckodriver](https://github.com/mozilla/geckodriver). It manages to download various (or the latest) Geckodriver versions and provides a programmatic interface to start and stop it within Node.js. __Note:__ this is a wrapper module. If you discover any bugs with Geckodriver, please report them in the [official repository](https://github.com/mozilla/geckodriver).

__Requirements:__ Node.js 22.19.0 or newer. With Yarn and without WebdriverIO, also install `@wdio/logger`. See [Compatibility](https://github.com/webdriverio/driver#compatibility).

# Installing

You can install this package via:

```sh
npm install geckodriver
```

Or install it globally:

```sh
npm install -g geckodriver
```

__Note:__ This installs a `geckodriver` shell script that runs the executable, but on Windows, [`selenium-webdriver`](https://www.npmjs.com/package/selenium-webdriver) looks for `geckodriver.exe`. The package downloads the binary into its cache folder (`GECKODRIVER_CACHE_DIR`, by default the system temporary folder) as `geckodriver-<version>.exe`, not into the package folder. Set the cache folder and the version, run the driver once, then copy the binary to a folder on your `PATH` (such as the npm bin directory):

```cmd
set GECKODRIVER_CACHE_DIR=%USERPROFILE%\geckodriver
set GECKODRIVER_VERSION=0.37.1
geckodriver --version
copy /Y %GECKODRIVER_CACHE_DIR%\geckodriver-%GECKODRIVER_VERSION%.exe %APPDATA%\npm\geckodriver.exe
```

Name the exact version: with a wildcard, `copy` joins all cached versions into one broken file.

Once installed you can start Geckodriver via:

```sh
npx geckodriver --port=4444
```

By default, this package downloads Geckodriver when used for the first time through the CLI or the programmatic interface. If you like to download it as part of the npm install process, set the `GECKODRIVER_AUTO_INSTALL` environment flag, e.g.:

```sh
GECKODRIVER_AUTO_INSTALL=1 npm i
```

The download runs in the package's `postinstall` script. pnpm 10 or newer and Bun run it only for a package you approve (`pnpm approve-builds`, or `trustedDependencies` in Bun), and recent npm versions warn until you approve it with `npm install-scripts approve geckodriver`. If the download fails, the install does not fail: the driver then downloads on first use.

To get a list of available CLI options run `npx geckodriver --help`. By default, this package downloads the latest version of the driver. If you prefer to have it install a custom Geckodriver version you can define the environment variable `GECKODRIVER_VERSION` when running in CLI, e.g.:

```sh
$ npm i geckodriver
$ GECKODRIVER_VERSION="0.31.0" npx geckodriver --version
geckodriver 0.31.0 (b617178ef491 2022-04-06 11:57 +0000)

The source code of this program is available from
testing/geckodriver in https://hg.mozilla.org/mozilla-central.

This program is subject to the terms of the Mozilla Public License 2.0.
You can obtain a copy of the license at https://mozilla.org/MPL/2.0/.
```

## Setting a CDN URL for binary download

To set an alternate CDN location for Geckodriver binaries, set the `GECKODRIVER_CDNURL` like this:

```sh
GECKODRIVER_CDNURL=https://INTERNAL_CDN/geckodriver/download
```

Binaries on your CDN should be located in a subdirectory of the above base URL. For example, `/vxx.xx.xx/*.tar.gz` should be located under `/geckodriver/download` above.

Alternatively, add it to your [`.npmrc`](https://docs.npmjs.com/cli/configuring-npm/npmrc) file:

```
geckodriver_cdnurl=https://INTERNAL_CDN/geckodriver/download
```

The default location is set to https://github.com/mozilla/geckodriver/releases/download

A CDN URL can carry credentials, for example `https://user:password@INTERNAL_CDN`: they are sent as a Basic `Authorization` header and kept out of the logs. Percent-encode special characters in them (`@` is `%40`, `%` is `%25`). Use an `https://` URL: over `http://`, Basic credentials travel in clear text. A redirect to another host does not receive them.

## Setting a PROXY URL

Use `HTTPS_PROXY` or `HTTP_PROXY` to set your proxy URL, and `NO_PROXY` for the hosts that skip it. The lower-case forms (`https_proxy`, `http_proxy`, `no_proxy`) work too and win over the upper-case ones. A dispatcher set with undici's `setGlobalDispatcher` (as in the [WebdriverIO proxy docs](https://webdriver.io/docs/proxy)) wins over these variables.

# Programmatic Interface

You can import this package with Node.js and start the driver as part of your script and use it e.g. with [WebdriverIO](https://webdriver.io).

## Exported Methods

The package exports a `start` and `download` method.

### `start`

Starts a Geckodriver instance and returns a [`ChildProcess`](https://nodejs.org/api/child_process.html#class-childprocess). If Geckodriver is not downloaded it will download it for you.

The driver writes logs to its `stdout` and `stderr`. Read them, or pass `spawnOpts: { stdio: 'ignore' }`: an unread pipe fills up and then blocks the driver.

__Params:__ `GeckodriverParameters` - options to pass into Geckodriver (see below)

__Example:__

```js
import { start } from 'geckodriver';
import { remote } from 'webdriverio';
import waitPort from 'wait-port';

/**
 * first start Geckodriver
 */
const cp = await start({ port: 4444 });

/**
 * wait for Geckodriver to be up
 */
await waitPort({ port: 4444 });

/**
 * then start WebdriverIO session on that port: without `port`, WebdriverIO starts a driver of its own.
 * Geckodriver accepts `127.0.0.1` but not `localhost` (the default) unless you pass `allowHosts`.
 */
const browser = await remote({ hostname: '127.0.0.1', port: 4444, capabilities: { browserName: 'firefox' } });
await browser.url('https://webdriver.io');
console.log(await browser.getTitle()); // prints "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"

/**
 * kill Geckodriver process
 */
cp.kill();
```

__Note:__ as you can see in the example above this package does not wait for the driver to be up, you have to manage this yourself through packages like [`wait-port`](https://github.com/dwmkerr/wait-port).

### `download`

Method to download a Geckodriver with a particular version. If a version parameter is omitted it tries to download the latest available version of the driver.

__Params:__ `string` - version of Geckodriver to download (optional)

## CJS Support

In case your module uses CJS you can use this package as follows:

```js
const { start } = require('geckodriver')
// see example above
```

## Options

The `start` method offers the following options to be passed on to the actual Geckodriver CLI.

### `allowHosts`

List of host names to allow. By default, the value of --host is allowed, and in addition, if that's a well-known local address, other variations on well-known local addresses are allowed. If --allow-hosts is provided only exactly those hosts are allowed.

Type: `string[]`<br />
Default: `[]`

### `allowOrigins`
List of request origins to allow. These must be formatted as `scheme://host:port`. By default, any request with an origin header is rejected. If `--allow-origins` is provided then only exactly those origins are allowed.

Type: `string[]`<br />
Default: `[]`

### `binary`
Path to the Firefox binary.

Type: `string`

### `connectExisting`
Connect to an existing Firefox instance.

Type: `boolean`<br />
Default: `false`

### `host`
Host IP to use for WebDriver server.

Type: `string`<br />
Default: `0.0.0.0`

### `jsdebugger`
Attach browser toolbox debugger for Firefox.

Type: `boolean`<br />
Default: `false`

### `log`
Set Gecko log level [possible values: `fatal`, `error`, `warn`, `info`, `config`, `debug`, `trace`].

Type: `string`

### `logNoTruncate`
Log verbosely and don't truncate long strings so that the log can be replayed.

Type: `boolean`

### `marionetteHost`
Host to use to connect to Gecko.

Type: `string`<br />
Default: `127.0.0.1`

### `marionettePort`
Port to use to connect to Gecko.

Type: `number`<br />
Default: `0`

### `port`
Port to listen on.

Type: `number`

### `websocketPort`
Port to use for Debugger / WebDriver BiDi. If omitted and `connectExisting` is not set, it defaults to `0` (a random available port) rather than Geckodriver's native default, so that parallel instances don't collide. Setting `websocketPort` together with `connectExisting: true` throws an error, since the two options can't be used together.

Type: `number`

### `profileRoot`
Directory in which to create profiles. Defaults to the system temporary directory.

Type: `string`

### `geckoDriverVersion`
A version of Geckodriver to start. See https://github.com/mozilla/geckodriver/releases for all available versions, platforms and architecture.

Type: `string`

### `customGeckoDriverPath`
Don't download Geckodriver, instead use a custom path to it, e.g. a cached binary.

Type: `string`<br />
Default: `process.env.GECKODRIVER_PATH`

### `cacheDir`
The path to the root of the cache directory.

Type: `string`<br />
Default: `process.env.GECKODRIVER_CACHE_DIR || os.tmpdir()`

### `spawnOpts`
Options to pass into the geckodriver process. This can be useful if needing
Firefox to spawn with `MOZ_` prefix variables, such as `MOZ_HEADLESS_WIDTH`.
See https://nodejs.org/api/child_process.html#child_processspawncommand-args-options for
all options. Pass `{ stdio: 'ignore' }` if you don't read the driver output.

Type: `SpawnOptions`<br />
Default: `undefined`

# Other Browser Driver

If you also look for other browser driver npm wrappers, you can find them here:

- Chrome: [giggio/node-chromedriver](https://github.com/giggio/node-chromedriver)
- Microsoft Edge: [webdriverio/driver - node-edgedriver](https://github.com/webdriverio/driver/tree/main/packages/node-edgedriver)
- Safari: [webdriverio/driver - node-safaridriver](https://github.com/webdriverio/driver/tree/main/packages/node-safaridriver)

---

For more information on WebdriverIO see the [homepage](https://webdriver.io).
