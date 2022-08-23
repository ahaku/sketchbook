import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router-dom";
import s from "./SketchPage.module.scss";
import db from "../../db";
import { useState } from "react";

const SketchPage = () => {
  const { sketchId } = useParams();
  const [loading, setLoading] = useState(true);

  const sketch = useLiveQuery(async () => {
    setLoading(true);
    const result = await db.sketches
      .where("fileId")
      .equals(sketchId || "")
      .first();

    setLoading(false);

    return result;
  }, [sketchId]);

  if (loading) {
    return <div className={s.sketchPage}>Loading...</div>;
  }

  if (!sketch && !loading) {
    return <div className={s.sketchPage}>Unable to find</div>;
  }

  return <div className={s.sketchPage}>SketchPage {sketch?.fileId}</div>;
};

export default SketchPage;
