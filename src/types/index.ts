import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types";

export type Theme = "light" | "dark";

export interface StorageItem {
  readonly id: string;
  name: string;
  isFolder: boolean;
  children?: StorageItem[];
  path?: string[];
}

export interface SketchData {
  elements: readonly ExcalidrawElement[];
  appState: Partial<AppState>;
  files: BinaryFiles;
}

export interface Sketch {
  fileId: string;
  name: string;
  path: string[];
  data: SketchData;
  lastModified: number;
}
