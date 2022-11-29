import { useLocation, useNavigate } from "react-router-dom";
import db from "../../../../db";
import { StorageItem } from "../../../../types";
import { BsCardImage } from "react-icons/bs";
import s from "./File.module.scss";
import EditIcon from "../../../common/EditIcon";
import { useState } from "react";
import NameInput from "../../../common/NameInput";
import RemoveButton from "../../../common/RemoveButton";

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
  const [showInput, setShowInput] = useState<boolean>(false);

  const onEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInput(true);
  };
  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    db.sketches
      .where("fileId")
      .equals(id)
      .delete()
      .then(() => {
        active && navigate("/");
      });
    removeItem(id);
  };
  const onClick = () => {
    navigate(`/${id}`);
  };
  const onNameChange = (value: string) => {
    const patch = { name: value.trim() || name };
    setShowInput(false);
    editItem(id, patch);
    db.sketches.where("fileId").equals(id).modify(patch);
  };
  const onCancel = () => {
    setShowInput(false);
  };

  return (
    <div onClick={onClick} className={s.file}>
      <div className={s.header}>
        <BsCardImage />

        {showInput ? (
          <NameInput
            onNameChange={onNameChange}
            onCancel={onCancel}
            defaultValue={name}
          />
        ) : (
          <span data-active={active}>{name}</span>
        )}
      </div>
      <div className={s.actions}>
        <EditIcon onClick={onEditClick} />
        <RemoveButton onConfirm={onRemove} />
      </div>
    </div>
  );
};

export default File;
