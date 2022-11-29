import Dexie, { Table, Transaction } from "dexie";
import { DBNames, DB_NAME, STORAGE_KEY } from "../constants";
import { uuidv4 } from "../helpers/utils";
import { Sketch, StorageItem } from "../types";

export class Database extends Dexie {
  [DBNames.storage]!: Table<StorageItem[]>;
  [DBNames.sketches]!: Table<Sketch>;

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      [DBNames.storage]: "",
      [DBNames.sketches]: "++id, fileId, *path",
    });
    this._populate();
  }

  private _populate() {
    const folderId = uuidv4();
    const fileId = uuidv4();
    this.on("populate", (tx: Transaction) => {
      tx.table(DBNames.storage).add(
        [
          {
            id: folderId,
            name: "Sketches",
            isFolder: true,
            path: [],
            children: [
              {
                id: fileId,
                name: "example.sketch",
                isFolder: false,
                path: [folderId],
              },
            ],
          },
        ],
        STORAGE_KEY
      );

      tx.table(DBNames.sketches).add({
        fileId,
        path: [folderId],
        data: {
          elements: [],
          appState: {},
          files: {},
        },
        name: "example.sketch",
        lastModified: Date.now(),
      });
    });
  }
}
export const updateStorage = async (items: StorageItem[]) => {
  try {
    await db.storage.update(STORAGE_KEY, items);
    console.log("Successful update");
  } catch (error) {
    console.error(`Failed to modify, ${error}`);
  }
};

const db = new Database();
export default db;
