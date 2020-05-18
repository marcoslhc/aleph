import React from "react";
import { Player } from "../";

interface EpisodeProps {
  media?: {
    url: string;
  };
}

export const Episode: React.FC<EpisodeProps> = ({ media = undefined }) => {
  return (
    <div>
      {!media || media?.url === "" ? (
        <div>Select an episode</div>
      ) : (
        <Player src={media?.url ?? ""} />
      )}
    </div>
  );
};

export default Episode;
