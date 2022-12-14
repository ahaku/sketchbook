import { useLiveQuery } from "dexie-react-hooks";
import { STORAGE_KEY } from "../../constants";
import db from "../../db";
import { updateStorage } from "../../db/db";
import { StorageItem } from "../../types";
import { add, edit, remove } from "./helpers";
import FileStorageItem from "./Item";
import s from "./FileStorage.module.scss";

const FileStorage = () => {
  const storage = useLiveQuery(() => db.storage.get(STORAGE_KEY));

  const addItem = (parentId: string, itemToAdd: StorageItem) => {
    if (storage) {
      const newItems = add(storage, parentId, itemToAdd);
      updateStorage(newItems);
    }
  };

  const editItem = (itemId: string, patch: Partial<StorageItem>) => {
    if (storage) {
      const newItems = edit(storage, itemId, patch);
      updateStorage(newItems);
    }
  };

  const removeItem = (itemId: string) => {
    if (storage) {
      const newItems = remove(storage, itemId);
      updateStorage(newItems);
    }
  };

  return (
    <div className={s.fileStorage}>
      {storage?.map((item) => {
        return (
          <FileStorageItem
            key={item.id}
            item={item}
            addItem={addItem}
            editItem={editItem}
            removeItem={removeItem}
          />
        );
      })}
    </div>
  );
};

export default FileStorage;
