import type { PackageJson as TypeFestPackageJson } from 'type-fest';
export type PackageJson = TypeFestPackageJson;
export type NormalizedPackageJson = PackageJson & {
    name: string;
    version: string;
    readme: string;
    _id: string;
    bugs?: {
        url: string;
    };
    repository?: {
        type: string;
        url: string;
        directory?: string;
    };
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
/** Finds the directory containing the nearest `package.json` by walking upward from `dir`. */
export declare function findPackageRoot(dir: string): Promise<string>;
/** Finds the project root directory from `dir`. */
export declare function findPackageRootSync(dir: string): string;
/** Reads and parses `package.json` from `cwd`. */
export declare function readPackage(options?: NormalizeOptions): Promise<NormalizedPackageJson>;
export declare function readPackage(options: ReadPackageOptions): Promise<PackageJson>;
//# sourceMappingURL=package-json.d.ts.map