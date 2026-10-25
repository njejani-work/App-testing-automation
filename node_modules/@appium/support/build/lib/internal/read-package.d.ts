import type { PackageJson as TypeFestPackageJson } from 'type-fest';
export type PackageJson = TypeFestPackageJson;
export type NormalizedPackageJson = PackageJson & {
    name: string;
    version: string;
    readme: string;
    _id: string;
};
export type ReadPackageOptions = {
    /** Directory containing `package.json`. Defaults to `process.cwd()`. */
    cwd?: string;
    /** Normalize package data. Defaults to `true`. */
    normalize?: boolean;
};
export type NormalizeOptions = ReadPackageOptions & {
    normalize?: true;
};
export type PackageDirectoryOptions = {
    /** Directory to search upward from. Defaults to `process.cwd()`. */
    cwd?: string;
};
/** Finds the directory containing the nearest `package.json` by walking upward from `cwd`. */
export declare function packageDirectorySync({ cwd }?: PackageDirectoryOptions): string | undefined;
/** Reads and parses `package.json` from `cwd`. */
export declare function readPackageSync(options?: NormalizeOptions): NormalizedPackageJson;
export declare function readPackageSync(options: ReadPackageOptions): PackageJson;
/** Reads and parses `package.json` from `cwd`. */
export declare function readPackage(options?: NormalizeOptions): Promise<NormalizedPackageJson>;
export declare function readPackage(options: ReadPackageOptions): Promise<PackageJson>;
//# sourceMappingURL=read-package.d.ts.map