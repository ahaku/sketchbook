import { StorageItem } from "../../../../types";
import s from "./File.module.scss";

interface FileProps {
  item: StorageItem;
}

const File = ({ item }: FileProps) => {
  const { name } = item;

  return <div className={s.file}>{name}</div>;
};

export default File;
