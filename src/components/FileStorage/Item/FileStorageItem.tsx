import { StorageItem } from "../../../types";
import File from "./File";
import Folder from "./Folder";

interface FileStorageItemProps {
  item: StorageItem;
  addItem: (parentId: string, itemToAdd: StorageItem) => void;
  editItem: (itemId: string, patch: Partial<StorageItem>) => void;
  removeItem: (itemId: string) => void;
}

const FileStorageItem = ({
  item,
  addItem,
  editItem,
  removeItem,
}: FileStorageItemProps) => {
  const { isFolder } = item;

  if (!isFolder) {
    return <File item={item} editItem={editItem} removeItem={removeItem} />;
  }

  return (
    <Folder
      item={item}
      addItem={addItem}
      editItem={editItem}
      removeItem={removeItem}
    />
  );
};

export default FileStorageItem;
