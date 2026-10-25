import type { SpawnOptions } from 'node:child_process';
import type { TeenProcessExecOptions } from 'teen_process';
export type SpawnBackgroundProcessOpts = Omit<SpawnOptions, 'stdio'>;
/**
 * Spawns a long-running "background" child process.  This is expected to only return control to the
 * parent process in the case of a nonzero exit code from the child process.
 * @param command Command to run
 * @param args Args to pass to command
 * @param opts Spawn options (`stdio` is always set to `'inherit'`)
 * @privateRemarks `teen_process` is good for running a one-shot command, but not so great for
 * background tasks; we use node's `child_process` directly here to pass `stdio` through, since
 * `teen_process` basically does not respect `{stdio: 'inherit'}`.
 */
export declare function spawnBackgroundProcess(command: string, args: string[], opts?: SpawnBackgroundProcessOpts): Promise<void>;
/**
 * Wraps {@linkcode exec} with error handling that appends stderr to the thrown error message.
 */
export declare function execWithErrorHandling(cmd: string, args?: string[], opts?: TeenProcessExecOptions): Promise<import("teen_process").TeenProcessExecResult<string>>;
//# sourceMappingURL=process.d.ts.map