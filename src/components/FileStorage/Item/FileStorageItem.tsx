import { useState } from "react";
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
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  if (!isFolder) {
    return <File item={item} />;
  }

  return (
    <Folder
      item={item}
      expanded={expanded}
      toggleExpand={toggleExpand}
      addItem={addItem}
      editItem={editItem}
      removeItem={removeItem}
    />
  );
};

export default FileStorageItem;
