import React from "react";
import style from "./item.module.css";
import { Episode as IEpisode } from "../../lib/feed/types";

export const Episode: React.FC<IEpisode & { showDescription?: boolean }> = ({
  title,
  author,
  description,
  showDescription = false,
  ...props
}) => {
  return (
    <div className={style.Episode}>
      <div>Play Episode</div>
      <div>
        <h3>{title}</h3>
        <p>
          <strong>{author}</strong>
        </p>
        {showDescription && <p>{description}</p>}
      </div>
    </div>
  );
};

export default Episode;
