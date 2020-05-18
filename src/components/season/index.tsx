import React from "react";
import style from "./season.module.css";

interface SeasonProps {
  seasonNumber: number;
  onClick: React.EventHandler<React.MouseEvent>;
}

export const Season: React.FC<SeasonProps> = ({
  seasonNumber,
  onClick = () => {},
}) => {
  return (
    <div className={style.Season} onClick={onClick}>
      <div className={style.SeasonTitle}>
        <h2>Season {seasonNumber}</h2>
      </div>
    </div>
  );
};
