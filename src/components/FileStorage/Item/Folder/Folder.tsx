import { uuidv4 } from "../../../../helpers/utils";
import { StorageItem } from "../../../../types";
import FileStorageItem from "../FileStorageItem";
import s from "./Folder.module.scss";

interface FolderProps {
  item: StorageItem;
  expanded: boolean;
  toggleExpand: () => void;
  addItem: (parentId: string, itemToAdd: StorageItem) => void;
  editItem: (itemId: string, patch: Partial<StorageItem>) => void;
  removeItem: (itemId: string) => void;
}

const Folder = ({
  item,
  expanded,
  toggleExpand,
  addItem,
  editItem,
  removeItem,
}: FolderProps) => {
  const { name, children } = item;

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
    addItem(item.id, newItem);
  };

  const onEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const itemName = prompt("Enter item name", name);
    editItem(item.id, { name: itemName || name });
  };

  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeItem(item.id);
  };

  return (
    <div className={s.folder}>
      <div className={s.header}>
        <div onClick={toggleExpand} className={s.name}>
          {name}
        </div>
        <div className={s.actions}>
          <button onClick={onAdd}>+</button>
          <button onClick={(e) => onAdd(e, false)}>f</button>
          <button onClick={onEdit}>e</button>
          <button onClick={onRemove}>r</button>
        </div>
      </div>
      <div className={`${expanded ? s.expanded : s.collapsed}`}>
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
