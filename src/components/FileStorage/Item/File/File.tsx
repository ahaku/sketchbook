import { Link, useLocation } from "react-router-dom";
import db from "../../../../db";
import { StorageItem } from "../../../../types";
import s from "./File.module.scss";

interface FileProps {
  item: StorageItem;
  editItem: (itemId: string, patch: Partial<StorageItem>) => void;
  removeItem: (itemId: string) => void;
}

const File = ({ item, editItem, removeItem }: FileProps) => {
  const { name, id } = item;
  const location = useLocation();
  const active = location?.pathname.endsWith(id);

  const onEdit = () => {
    const itemName = prompt("Enter file name", name);
    editItem(id, { name: itemName || name });
  };
  const onRemove = () => {
    db.sketches.where("fileId").equals(id).delete();
    removeItem(id);
  };

  return (
    <div className={s.file}>
      <div className={`${s.name} ${active ? s.active : ""}`}>
        <Link to={`/${id}`}>{name}</Link>
      </div>
      <div className={s.actions}>
        <button onClick={onEdit}>e</button>
        <button onClick={onRemove}>r</button>
      </div>
    </div>
  );
};

export default File;
