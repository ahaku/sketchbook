import db from "../../../../db";
import { uuidv4 } from "../../../../helpers/utils";
import { useLocalStorage } from "../../../../hooks";
import { StorageItem } from "../../../../types";
import FileStorageItem from "../FileStorageItem";
import s from "./Folder.module.scss";
import { FaFolderOpen, FaFolder } from "react-icons/fa";
import EditIcon from "../../../common/EditIcon";
import AddFileIcon from "../../../common/AddFileIcon";
import AddFolderIcon from "../../../common/AddFolderIcon";
import { useState } from "react";
import NameInput from "../../../common/NameInput";
import RemoveButton from "../../../common/RemoveButton";
import { useNavigate } from "react-router-dom";

interface FolderProps {
  item: StorageItem;
  addItem: (parentId: string, itemToAdd: StorageItem) => void;
  editItem: (itemId: string, patch: Partial<StorageItem>) => void;
  removeItem: (itemId: string) => void;
}
interface CreateData {
  showNewItem: boolean;
  isFolder: boolean;
}

const Folder = ({ item, addItem, editItem, removeItem }: FolderProps) => {
  const { name, children, path, id } = item;
  const isRoot = Array.isArray(path) && path.length === 0;

  const navigate = useNavigate();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [createData, setCreateData] = useState<CreateData>({
    showNewItem: false,
    isFolder: false,
  });
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
  const expandFolder = () => {
    if (!isExpanded) {
      setExpandedFolders([...expandedFolders, id]);
    }
  };

  const sortedChildren = [...(children || [])].sort((a) => {
    return a.isFolder ? -1 : 1;
  });

  const onAddClick = (e: React.MouseEvent, isFolder = true) => {
    e.stopPropagation();
    expandFolder();
    setCreateData({
      showNewItem: true,
      isFolder,
    });
  };

  const onAdd = (value: string) => {
    const defaultName = new Date().toLocaleString();
    const newItem = {
      id: uuidv4(),
      name: value || defaultName,
      isFolder: createData.isFolder,
    };
    if (!createData.isFolder) {
      db.sketches.add({
        fileId: newItem.id,
        name: newItem.name,
        path: [...(path || []), id],
        data: {
          elements: [],
          appState: {},
          files: {},
        },
        lastModified: Date.now(),
      });
    }
    addItem(item.id, newItem);
    setCreateData((prev) => ({ ...prev, showNewItem: false }));
  };
  const onNewItemCancel = () => {
    setCreateData((prev) => ({ ...prev, showNewItem: false }));
  };
  const onEditCancel = () => {
    setShowInput(false);
  };

  const onEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInput(true);
  };
  const onNameChange = (value: string) => {
    setShowInput(false);
    editItem(id, { name: value.trim() || name });
  };
  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    db.sketches.where("path").anyOf(id).delete();
    removeItem(item.id);
  };
  const onDropDb = (e: React.MouseEvent) => {
    e.stopPropagation();
    db.delete().then(() => {
      window.location.href = "/";
      localStorage.setItem("expanded-folders", "[]");
    });
  };

  return (
    <div className={s.folder}>
      <div onClick={toggleFolderExpand} className={s.header}>
        <div className={s.info}>
          {isExpanded ? <FaFolderOpen /> : <FaFolder />}
          {showInput ? (
            <NameInput
              onNameChange={onNameChange}
              onCancel={onEditCancel}
              defaultValue={name}
            />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div className={s.actions}>
          <AddFolderIcon onClick={onAddClick} />
          <AddFileIcon onClick={(e) => onAddClick(e, false)} />
          <EditIcon onClick={onEditClick} />
          <RemoveButton
            onConfirm={isRoot ? onDropDb : onRemove}
            confirmText={isRoot ? "Drop all ?" : "Delete ?"}
          />
        </div>
      </div>
      <div className={`${isExpanded ? s.expanded : s.collapsed}`}>
        {createData.showNewItem && (
          <div className={s.newItem}>
            <NameInput
              onNameChange={onAdd}
              onCancel={onNewItemCancel}
              defaultValue={""}
            />
          </div>
        )}
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
