import type { SpawnOptions } from 'node:child_process'

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'config' | 'debug' | 'trace'

export interface GeckodriverParameters {
    /**
     * List of hostnames to allow. By default the value of --host is allowed, and in addition if that's a well
     * known local address, other variations on well known local addresses are allowed. If --allow-hosts is
     * provided only exactly those hosts are allowed
     * @default []
     */
    allowHosts?: string[]
    /**
     * List of request origins to allow. These must be formatted as scheme://host:port. By default any request
     * with an origin header is rejected. If --allow-origins is provided then only exactly those origins
     * are allowed.
     * @default []
     */
    allowOrigins?: string[]
    /**
     * Path to the Firefox binary
     */
    binary?: string
    /**
     * Connect to an existing Firefox instance
     * @default false
     */
    connectExisting?: boolean
    /**
     * Host IP to use for WebDriver server
     * @default 0.0.0.0
     */
    host?: string
    /**
     * Attach browser toolbox debugger for Firefox
     * @default false
     */
    jsdebugger?: boolean
    /**
     * Set Gecko log level [possible values: fatal, error, warn, info, config, debug, trace]
     */
    log?: LogLevel
    /**
     * log verbosely and don't truncate long strings so that the log can be replayed
     */
    logNoTruncate?: boolean
    /**
     * Host to use to connect to Gecko
     * @default 127.0.0.1
     */
    marionetteHost?: string
    /**
     * Port to use to connect to Gecko
     * @default 0
     */
    marionettePort?: number
    /**
     * port to listen on
     */
    port?: number
    /**
     * port to use for Debugger / Webdriver BiDi
     */
    websocketPort?: number
    /**
     * Directory in which to create profiles. Defaults to the system temporary directory.
     */
    profileRoot?: string
    /**
     * Version of Geckodriver to start. See https://github.com/mozilla/geckodriver/releases for all available versions, platforms and architecture.
     */
    geckoDriverVersion?: string
    /**
     * Don't download Geckodriver, instead use a custom path to it, e.g. a cached binary.
     */
    customGeckoDriverPath?: string
    /**
     * The path to the root of the cache directory.
     * @default process.env.GECKODRIVER_CACHE_DIR || os.tmpdir()
     */
    cacheDir?: string

    /**
     * Options for `child_process.spawn`. Pass `{ stdio: 'ignore' }` if you don't read the
     * driver output: an unread pipe fills up and then blocks the driver.
     * @see options in https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
     * @default undefined
     */
    spawnOpts?: SpawnOptions
}

declare global {
    namespace WebdriverIO {
        interface GeckodriverOptions extends GeckodriverParameters { }
    }
}
