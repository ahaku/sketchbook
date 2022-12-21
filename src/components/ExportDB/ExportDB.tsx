import { exportDB } from "dexie-export-import";
import { TbDatabaseExport } from "react-icons/tb";
import s from "./ExportDB.module.scss";
import db from "../../db";
import { useState } from "react";
import { Statuses } from "../../types/enums";
import Spinner from "../common/Spinner";

const ExportDB = () => {
  const [status, setStatus] = useState<Statuses>(Statuses.INIT);
  const isLoading = status === Statuses.LOADING;

  const onClick = async () => {
    try {
      setStatus(Statuses.LOADING);
      const blob = await exportDB(db);
      const fileName = `SketchbookDB.json`;
      const file = new File([blob], fileName, {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
      a.remove();
      setStatus(Statuses.SUCCESS);
    } catch (error) {
      console.log("error :", error);
      setStatus(Statuses.FAILURE);
    }
  };
  return (
    <button
      title={"Export database"}
      onClick={!isLoading ? onClick : undefined}
      className={s.exportDB}
    >
      {isLoading ? <Spinner /> : <TbDatabaseExport size={18} />}
    </button>
  );
};

export default ExportDB;
