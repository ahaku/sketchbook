export type Theme = "light" | "dark";

export interface StorageItem {
  readonly id: string;
  name: string;
  isFolder: boolean;
  children?: StorageItem[];
  path?: string[];
}

export interface Sketch {
  fileId: string;
  path: string[];
  data: any[];
}
