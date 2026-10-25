import type { IDoctorCheck } from '@appium/types';
/**
 * Process exit codes returned by {@link Doctor.run}.
 */
export declare const EXIT_CODE: Readonly<{
    readonly SUCCESS: 0;
    readonly HAS_MAJOR_ISSUES: 127;
}>;
/** Exit code values produced by {@link Doctor.run}. */
export type DoctorExitCode = (typeof EXIT_CODE)[keyof typeof EXIT_CODE];
/**
 * A failed check reported during {@link Doctor} diagnostics.
 */
export interface DoctorIssue {
    /** The check that produced this issue. */
    check: IDoctorCheck;
    /** Colored message string as logged during diagnosis. */
    error: string;
    /** Set after a successful automatic fix attempt. */
    fixed?: boolean;
}
export declare class Doctor {
    private readonly log;
    private readonly checks;
    private foundIssues;
    constructor(checks?: IDoctorCheck[]);
    private get issuesRequiredToFix();
    private get issuesOptionalToFix();
    /**
     * Runs diagnostics, reports issues, attempts automatic fixes where supported, and returns an exit code.
     *
     * @returns {@link EXIT_CODE.SUCCESS} when there are no issues or all issues were resolved;
     *   {@link EXIT_CODE.HAS_MAJOR_ISSUES} when manual intervention is still required or fixes failed.
     */
    run(): Promise<DoctorExitCode>;
    /**
     * The doctor shows the report
     */
    private diagnose;
    private reportManualIssues;
    private runAutoFix;
    private runAutoFixes;
    private toIssue;
    private buildFixMessage;
    private reportSuccess;
}
//# sourceMappingURL=doctor.d.ts.map