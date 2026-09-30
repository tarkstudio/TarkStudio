/**
 * TarkStudio Project Types
 */

export type OperationalMode = "all" | "online" | "offline" | "hybrid";
export type ProductType = "all" | "apk" | "website";
export type ProductStatus = "active" | "locked";

export interface Project {
  id: string;
  title: string;
  version: string;
  mode: "offline" | "online" | "hybrid";
  type: "apk" | "website";
  status: "active" | "locked";
  description: string;
  webUrl: string;
  apkUrl: string;
  icon: string;
  category?: string;
  size?: string;
  badgeLabel?: string;
}
