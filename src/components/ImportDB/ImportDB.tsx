import { useState } from "react";
import { importInto } from "dexie-export-import";
import { TbDatabaseImport } from "react-icons/tb";
import s from "./ImportDB.module.scss";

import db from "../../db";
import { Statuses } from "../../types/enums";
import Spinner from "../common/Spinner";

const ImportDB = () => {
  const [status, setStatus] = useState<Statuses>(Statuses.INIT);
  const isLoading = status === Statuses.LOADING;

  const onClick = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.click();
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];

        if (file) {
          setStatus(Statuses.LOADING);
          await importInto(db, file, {
            overwriteValues: true,
            clearTablesBeforeImport: true,
          });
          setStatus(Statuses.SUCCESS);
        }
      };
      input.remove();
    } catch (error) {
      console.log("error :", error);
      setStatus(Statuses.FAILURE);
    }
  };
  return (
    <button
      title={"Import database"}
      onClick={!isLoading ? onClick : undefined}
      className={s.importDB}
    >
      {isLoading ? <Spinner /> : <TbDatabaseImport size={18} />}
    </button>
  );
};

export default ImportDB;
