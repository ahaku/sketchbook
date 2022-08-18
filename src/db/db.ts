import Dexie, { Table, Transaction } from "dexie";
import { DBNames, STORAGE_KEY } from "../constants";
import { uuidv4 } from "../helpers/utils";
import { StorageItem } from "../types";

export class Database extends Dexie {
  [DBNames.storage]!: Table<StorageItem[]>;

  constructor() {
    super(DBNames.storage);
    this.version(1).stores({
      [DBNames.storage]: "",
    });
    this._populate();
  }

  private _populate() {
    this.on("populate", (tx: Transaction) => {
      tx.table(DBNames.storage).add(
        [
          {
            id: uuidv4(),
            name: "root",
            isFolder: true,
          },
        ],
        STORAGE_KEY
      );
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
