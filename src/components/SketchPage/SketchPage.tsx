import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router-dom";
import s from "./SketchPage.module.scss";
import { Excalidraw } from "@excalidraw/excalidraw";
import db from "../../db";
import { useCallback, useEffect, useRef, useState } from "react";
import { SketchData } from "../../types";

const SketchPage = () => {
  const { sketchId } = useParams();
  const [loading, setLoading] = useState(true);
  const excalidrawRef = useRef(null);
  const dataRef = useRef<SketchData>({ elements: [], appState: {} });
  const sketch = useLiveQuery(async () => {
    setLoading(true);
    const result = await db.sketches
      .where("fileId")
      .equals(sketchId || "")
      .first();

    setLoading(false);

    return result;
  }, [sketchId]);

  useEffect(() => {
    if (!loading && sketch) {
    }
  }, [loading, sketch]);

  const saveDataToDb = useCallback(() => {
    sketchId &&
      dataRef &&
      db.sketches
        .where("fileId")
        .equals(sketchId)
        .modify({
          data: {
            elements: dataRef.current.elements,
            appState: dataRef.current.appState,
          },
        });
  }, [sketchId]);

  useEffect(() => {
    window.addEventListener("beforeunload", saveDataToDb);
    return () => {
      window.removeEventListener("beforeunload", saveDataToDb);
    };
  }, [saveDataToDb]);

  useEffect(() => {
    return () => {
      // save sketch on unmount
      dataRef.current?.elements.length && saveDataToDb();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sketchId]);

  if (loading) {
    return <div className={s.sketchPage}>Loading...</div>;
  }

  if (!sketch && !loading) {
    return <div className={s.sketchPage}>Unable to find</div>;
  }

  return (
    <div className={s.sketchPage}>
      <div className={s.excalidraWrapper}>
        <Excalidraw
          ref={excalidrawRef}
          theme="dark"
          initialData={{
            elements: sketch?.data.elements,
            appState: sketch?.data.appState,
          }}
          onChange={(elements, state) => {
            dataRef.current = { elements, appState: state };
            // setElements(elements);
            // setDrawState(state);
          }}
          // onPointerUpdate={(payload) => console.log(payload)}
          // viewModeEnabled={viewModeEnabled}
          // zenModeEnabled={zenModeEnabled}
          // gridModeEnabled={gridModeEnabled}
        />
      </div>
    </div>
  );
};

export default SketchPage;
