import React from "react";
import { Channel as IChannel } from "../../lib/channel/types";
import styles from "./channels.module.css";
import { Channel } from "../";

interface ChannelsProps {
  channels: any;
  onSelect: any;
}

export const Channels: React.FC<ChannelsProps> = ({ channels, onSelect }) => (
  <div className={styles.Channels}>
    {channels.length &&
      channels.map((c: IChannel, idx: number) => {
        return <Channel key={idx} id={idx} {...c} onSelect={onSelect} />;
      })}
  </div>
);

export default Channels;
