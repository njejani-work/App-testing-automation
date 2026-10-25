import os from 'node:os';
export declare const V4_BROADCAST_IP = "0.0.0.0";
export declare const V6_BROADCAST_IP = "::";
/**
 * Returns network interfaces for the given IP family.
 *
 * @param family - 4 for IPv4, 6 for IPv6, or null for all.
 */
export declare function fetchInterfaces(family?: 4 | 6 | null): os.NetworkInterfaceInfo[];
/**
 * Returns true if the address is a broadcast IP (0.0.0.0 or ::).
 */
export declare function isBroadcastIp(address: string): boolean;
//# sourceMappingURL=network.d.ts.map