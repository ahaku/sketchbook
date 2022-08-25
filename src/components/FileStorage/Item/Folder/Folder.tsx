import db from "../../../../db";
import { uuidv4 } from "../../../../helpers/utils";
import { useLocalStorage } from "../../../../hooks";
import { StorageItem } from "../../../../types";
import FileStorageItem from "../FileStorageItem";
import s from "./Folder.module.scss";

interface FolderProps {
  item: StorageItem;
  addItem: (parentId: string, itemToAdd: StorageItem) => void;
  editItem: (itemId: string, patch: Partial<StorageItem>) => void;
  removeItem: (itemId: string) => void;
}

const Folder = ({ item, addItem, editItem, removeItem }: FolderProps) => {
  const { name, children, path, id } = item;

  const [expandedFolders, setExpandedFolders] = useLocalStorage<string[]>(
    "expanded-folders",
    []
  );
  const isExpanded = expandedFolders?.includes(id);
  const toggleFolderExpand = () => {
    if (isExpanded) {
      setExpandedFolders(expandedFolders.filter((folderId) => folderId !== id));
    } else {
      setExpandedFolders([...expandedFolders, id]);
    }
  };

  const sortedChildren = [...(children || [])].sort((a) => {
    return a.isFolder ? -1 : 1;
  });

  const onAdd = (e: React.MouseEvent, isFolder = true) => {
    e.stopPropagation();
    const itemName = prompt("Enter item name");
    const newItem = {
      id: uuidv4(),
      name: itemName || new Date().getTime().toString(),
      isFolder,
    };
    if (!isFolder) {
      db.sketches.add({
        fileId: newItem.id,
        path: [...(path || []), id],
        data: {
          elements: [],
          appState: {},
        },
      });
    }
    addItem(item.id, newItem);
  };

  const onEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const itemName = prompt("Enter item name", name);
    editItem(item.id, { name: itemName || name });
  };

  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    db.sketches.where("path").anyOf(id).delete();
    removeItem(item.id);
  };

  return (
    <div className={s.folder}>
      <div className={s.header}>
        <div onClick={toggleFolderExpand} className={s.name}>
          {name}
        </div>
        <div className={s.actions}>
          <button onClick={onAdd}>+</button>
          <button onClick={(e) => onAdd(e, false)}>f</button>
          <button onClick={onEdit}>e</button>
          <button onClick={onRemove}>r</button>
        </div>
      </div>
      <div className={`${isExpanded ? s.expanded : s.collapsed}`}>
        {sortedChildren.map((item) => {
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
    </div>
  );
};

export default Folder;
