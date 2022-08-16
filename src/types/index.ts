export type Theme = "light" | "dark";

export interface StorageItem {
  id: string;
  name: string;
  isFolder: boolean;
  children?: StorageItem[];
}
