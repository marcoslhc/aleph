import React from "react";
import style from "./season.module.css";
import Episode from "../item";
import { Episode as IEpisode } from "../../lib/feed/types";

export const Season: React.FC<{
  number: number;
  showList?: boolean;
  episodes: IEpisode[];
}> = ({ number, showList = false, episodes = [] }) => {
  return (
    <div className={style.Season}>
      <div className={style.SeasonTitle}>
        <h2>Season {number}</h2>
      </div>
      {showList && (
        <div className={style.SeasonContentWrapper}>
          {episodes.length && episodes.map(e => <Episode {...e} />)}
        </div>
      )}
    </div>
  );
};
