/**
 * The name of the extension type for drivers
 */
export declare const DRIVER_TYPE = "driver";
/**
 * The name of the extension type for plugins
 */
export declare const PLUGIN_TYPE = "plugin";
/**
 * The `server` command of the `appium` CLI
 */
export declare const SERVER_SUBCOMMAND = "server";
/**
 * The `setup` command of the `appium` CLI
 */
export declare const SETUP_SUBCOMMAND = "setup";
/**
 * The value of `--use-plugins` if _all_ plugins should be loaded
 */
export declare const USE_ALL_PLUGINS = "all";
export declare const KNOWN_PLUGINS: Readonly<{
    readonly 'execute-driver': "@appium/execute-driver-plugin";
    readonly images: "@appium/images-plugin";
    readonly inspector: "appium-inspector-plugin";
    readonly 'relaxed-caps': "@appium/relaxed-caps-plugin";
    readonly storage: "@appium/storage-plugin";
    readonly 'universal-xml': "@appium/universal-xml-plugin";
}>;
export declare const MOBILE_DRIVERS: Readonly<{
    readonly uiautomator2: "appium-uiautomator2-driver";
    readonly xcuitest: "appium-xcuitest-driver";
    readonly espresso: "appium-espresso-driver";
}>;
export declare const DESKTOP_DRIVERS: Readonly<{
    readonly mac2: "appium-mac2-driver";
    readonly windows: "appium-windows-driver";
}>;
export declare const DESKTOP_BROWSERS: Readonly<{
    readonly safari: "appium-safari-driver";
    readonly gecko: "appium-geckodriver";
    readonly chromium: "appium-chromium-driver";
}>;
export declare const KNOWN_DRIVERS: Readonly<{
    readonly safari: "appium-safari-driver";
    readonly gecko: "appium-geckodriver";
    readonly chromium: "appium-chromium-driver";
    readonly mac2: "appium-mac2-driver";
    readonly windows: "appium-windows-driver";
    readonly uiautomator2: "appium-uiautomator2-driver";
    readonly xcuitest: "appium-xcuitest-driver";
    readonly espresso: "appium-espresso-driver";
}>;
/**
 * Relative path to directory containing any Appium internal files
 */
export declare const CACHE_DIR_RELATIVE_PATH: string;
/**
 * Relative path to hashfile (from `APPIUM_HOME`) of consuming project's `package.json` (if it exists)
 */
export declare const PKG_HASHFILE_RELATIVE_PATH: string;
export declare const EXT_SUBCOMMAND_LIST = "list";
export declare const EXT_SUBCOMMAND_INSTALL = "install";
export declare const EXT_SUBCOMMAND_UNINSTALL = "uninstall";
export declare const EXT_SUBCOMMAND_UPDATE = "update";
export declare const EXT_SUBCOMMAND_RUN = "run";
export declare const EXT_SUBCOMMAND_DOCTOR = "doctor";
/**
 * Current revision of the manifest (`extensions.yaml`) schema
 */
export declare const CURRENT_SCHEMA_REV = 4;
/**
 * The default number of stack frames to show in a "long" stack trace, when enabled via `--long-stacktrace`
 * @remarks This value may be increased in the future.
 * @privateRemarks A value like `Infinity` may provide to have deleterious effects on
 * memory usage, perf, and/or log output, and higher limits may be difficult to scan.
 */
export declare const LONG_STACKTRACE_LIMIT = 100;
/**
 * Where should the bidi websocket handler live on the server?
 */
export declare const BIDI_BASE_PATH = "/bidi";
/**
 * The name of the event for drivers to emit when they want to send bidi events to a client over
 * a bidi socket
 */
export declare const BIDI_EVENT_NAME = "bidiEvent";
/**
 * The name of the insecure feature that allows retrieving the list of active server sessions
 */
export declare const SESSION_DISCOVERY_FEATURE = "session_discovery";
//# sourceMappingURL=constants.d.ts.map