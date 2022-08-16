import { useState } from "react";
import { StorageItem } from "../../types";
import { add, edit, remove } from "./helpers";
import FileStorageItem from "./Item";

const items: StorageItem[] = [
  {
    id: "1",
    name: "src",
    isFolder: true,
    children: [
      {
        id: "2",
        name: "file_1.txt",
        isFolder: false,
      },
    ],
  },
  {
    id: "3",
    name: "another_file.txt",
    isFolder: false,
  },
];

const FileStorage = () => {
  const [fileSystem, setFileSystem] = useState(() => items);

  const addItem = (parentId: string, itemToAdd: StorageItem) => {
    const newItems = add(fileSystem, parentId, itemToAdd);
    setFileSystem(newItems);
  };

  const editItem = (itemId: string, patch: Partial<StorageItem>) => {
    const newItems = edit(fileSystem, itemId, patch);
    setFileSystem(newItems);
  };

  const removeItem = (itemId: string) => {
    const newItems = remove(fileSystem, itemId);
    setFileSystem(newItems);
  };

  return (
    <div>
      {fileSystem.map((item) => {
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
