import React from "react";
import style from "./channel.module.css";

interface ChannelProps {
  id: string | number;
  image: { url: string; title: string };
  title: string;
  onSelect: (a: any) => void;
}

export const Channel: React.FC<ChannelProps> = ({
  id,
  image,
  title,
  onSelect,
}) => (
  <div onClick={() => onSelect(id)} className={style.Channel}>
    <div className={style.ImageWrapper}>
      <img className={style.Image} src={image.url} alt={image.title} />
    </div>
    <div>
      <div>{title}</div>
    </div>
  </div>
);

export default Channel;
