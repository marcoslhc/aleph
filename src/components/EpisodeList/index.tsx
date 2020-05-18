import React from "react";
import { Item } from "../";
import style from "./EpisodeList.module.css";
import { Episode } from "../../lib/channel/types";

interface EpisodeListProps {
  episodes: Episode[];
  onSelectItem: (a: any) => void;
}

export const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  onSelectItem,
}) => (
  <div className={style.EpisodeList}>
    {episodes.length &&
      episodes.map((e, idx) => (
        <Item
          key={idx}
          onClick={() =>
            onSelectItem({
              season: Math.max(e.season - 1, 0),
              id: e.episode,
              type: e.type,
            })
          }
          {...e}
        />
      ))}
  </div>
);
