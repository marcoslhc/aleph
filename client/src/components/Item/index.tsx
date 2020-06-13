import React from "react";
import style from "./item.module.css";
import { Episode as IEpisode } from "../../lib/channel/types";

type ItemProps = IEpisode & {
  onClick: React.MouseEventHandler;
  showDescription?: boolean;
};

export const Item: React.FC<ItemProps> = ({
  title,
  author,
  description,
  showDescription = false,
  onClick = () => {},
  ...props
}) => {
  return (
    <div className={style.Item} onClick={onClick}>
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

export default Item;
