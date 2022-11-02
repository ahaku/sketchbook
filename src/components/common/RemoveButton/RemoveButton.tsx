import { useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { useClickOutside } from "../../../hooks";
import RemoveIcon from "../RemoveIcon";
import s from "./RemoveButton.module.scss";

interface Props {
  onConfirm: (e: React.MouseEvent) => void;
}

const RemoveButton = ({ onConfirm }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  useClickOutside(ref, closeConfirm);

  const onClickHandler = (e: React.MouseEvent) => {
    setShowConfirm(true);
    e.stopPropagation();
  };

  return (
    <div
      className={s.removeButton}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <RemoveIcon onClick={onClickHandler} />
      {showConfirm && (
        <div className={s.confirmWrapper} ref={ref}>
          <span>Delete ?</span>
          <BiCheck size={24} onClick={onConfirm} />
          <IoCloseSharp size={22} onClick={closeConfirm} />
        </div>
      )}
    </div>
  );
};

export default RemoveButton;
