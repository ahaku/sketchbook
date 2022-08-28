import { useLocation, useNavigate } from "react-router-dom";
import db from "../../../../db";
import { StorageItem } from "../../../../types";
import { BsCardImage } from "react-icons/bs";
import s from "./File.module.scss";
import EditIcon from "../../../common/EditIcon";
import RemoveIcon from "../../../common/RemoveIcon";

interface FileProps {
  item: StorageItem;
  editItem: (itemId: string, patch: Partial<StorageItem>) => void;
  removeItem: (itemId: string) => void;
}

const File = ({ item, editItem, removeItem }: FileProps) => {
  const navigate = useNavigate();
  const { name, id } = item;
  const location = useLocation();
  const active = location?.pathname.endsWith(id);

  const onEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const itemName = prompt("Enter file name", name);
    editItem(id, { name: itemName || name });
  };
  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    db.sketches.where("fileId").equals(id).delete();
    removeItem(id);
  };
  const onClick = () => {
    navigate(`/${id}`);
  };

  return (
    <div onClick={onClick} className={s.file}>
      <div className={s.header}>
        <div className={s.icon}>
          <BsCardImage />
        </div>
        <div className={`${s.name} ${active ? s.active : ""}`}>{name}</div>
      </div>
      <div className={s.actions}>
        <EditIcon onClick={onEdit} />
        <RemoveIcon onClick={onRemove} />
      </div>
    </div>
  );
};

export default File;
