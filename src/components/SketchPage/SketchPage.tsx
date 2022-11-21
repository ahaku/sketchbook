import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router-dom";
import s from "./SketchPage.module.scss";
import { Excalidraw } from "@excalidraw/excalidraw";
import db from "../../db";
import { useCallback, useEffect, useRef, useState } from "react";
import { SketchData } from "../../types";
import { useThemeContext } from "../../theme/ThemeContext";
import { LibraryItems } from "@excalidraw/excalidraw/types/types";
import { useLocalStorage } from "../../hooks";

const SketchPage = () => {
  const { sketchId } = useParams();
  const { theme } = useThemeContext();
  const [libraryItems, setLibraryItems] = useLocalStorage<LibraryItems>(
    "library-items",
    []
  );
  const [loading, setLoading] = useState(true);
  const excalidrawRef = useRef(null);
  const dataRef = useRef<SketchData>({ elements: [], appState: {}, files: {} });
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
    if (sketch?.name) {
      document.title = "Sketchbook | " + sketch.name;
    }

    return () => {
      document.title = "Sketchbook";
    };
  }, [sketch]);

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
            files: dataRef.current.files,
          },
          lastModified: Date.now(),
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
    return <div className={s.noData}>Loading...</div>;
  }

  if (!loading && !sketch) {
    return <div className={s.noData}>Unable to find</div>;
  }

  return (
    <div className={s.sketchPage}>
      <div className={s.excalidraWrapper}>
        <Excalidraw
          ref={excalidrawRef}
          theme={theme}
          initialData={{
            elements: sketch?.data.elements,
            appState: sketch?.data.appState,
            files: sketch?.data.files,
            libraryItems,
          }}
          onChange={(elements, state, files) => {
            dataRef.current = { elements, appState: state, files };
          }}
          onLibraryChange={(items) => {
            setLibraryItems(items);
          }}
          name={sketch?.name || ""}
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
