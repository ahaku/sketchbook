import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../../db";
import { Statuses } from "../../types/enums";
import LoadingText from "../common/LoadingText";
import s from "./HomePage.module.scss";

const HomePage = () => {
  const [status, setStatus] = useState(Statuses.INIT);
  const allSketches = useLiveQuery(async () => {
    try {
      setStatus(Statuses.LOADING);
      const result = await db.sketches.toArray();
      setStatus(Statuses.SUCCESS);
      return result;
    } catch (error) {
      setStatus(Statuses.FAILURE);
      return [];
    }
  }, []);
  const sortedSketches = allSketches?.sort(
    (a, b) => b.lastModified - a.lastModified
  );

  useEffect(() => {
    return () => {
      setStatus(Statuses.INIT);
    };
  }, []);

  if (status === Statuses.FAILURE) {
    return <div className={s.home}>Something went wrong</div>;
  }

  return (
    <div className={s.home}>
      {status === Statuses.SUCCESS ? (
        <div className={s.recent}>
          <h2>Recent Sketches</h2>
          {sortedSketches && sortedSketches.length > 0 ? (
            sortedSketches.map((sketch) => (
              <Link to={`/${sketch.fileId}`} key={sketch.fileId}>
                <div className={s.file}>
                  <span>{sketch.name || sketch.fileId}</span>
                </div>
              </Link>
            ))
          ) : (
            <span>There's nothing to show here</span>
          )}
        </div>
      ) : status === Statuses.LOADING ? (
        <div className={s.loadingWrapper}>
          <LoadingText />
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
