import db from "../../../../db";
import { uuidv4 } from "../../../../helpers/utils";
import { useLocalStorage } from "../../../../hooks";
import { StorageItem } from "../../../../types";
import FileStorageItem from "../FileStorageItem";
import s from "./Folder.module.scss";
import { FaFolderOpen, FaFolder } from "react-icons/fa";
import RemoveIcon from "../../../common/RemoveIcon";
import EditIcon from "../../../common/EditIcon";
import AddFileIcon from "../../../common/AddFileIcon";
import AddFolderIcon from "../../../common/AddFolderIcon";

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
          files: {},
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
      <div onClick={toggleFolderExpand} className={s.header}>
        <div className={s.info}>
          <div className={s.icon}>
            {isExpanded ? <FaFolderOpen /> : <FaFolder />}
          </div>
          <span>{name}</span>
        </div>
        <div className={s.actions}>
          <AddFolderIcon onClick={onAdd} />
          <AddFileIcon onClick={(e) => onAdd(e, false)} />
          <EditIcon onClick={onEdit} />
          <RemoveIcon onClick={onRemove} />
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
