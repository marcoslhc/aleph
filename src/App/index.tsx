import * as React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styles from "./App.module.css";
import { getChannels, selectChannel } from "../store/slices/channels";
import {
  getChannel,
  selectItem,
  selectSeason,
  clearSeason,
} from "../store/slices/channel";
import { Season as ISeason } from "../lib/channel/types";
import { Season, Episode, EpisodeList, Channels } from "../components";

import { RootState } from "../store/types";
import { get } from "lodash";
type selectionType = "EPISODE" | "SEASON" | "CHANNEL";
// const globalStateReducer = (state, action) => {
// switch (action.type) {
//   default:
//     return state
// }
// }
type N = number;
export default function App() {
  const dispatch = useDispatch();
  const {
    channels,
    channel,
    selectedChannel,
    selectedSeason,
    selectedSeasonId,
    selectedItem,
  } = useSelector((state: RootState) => {
    const selectedSeasonId = state.channel.selectedSeasonId;
    const selectedSeason =
      selectedSeasonId !== undefined &&
      state.channel.data.episodes[selectedSeasonId];
    const selectedItem = get(
      state.channel.data.episodes,
      state.channel.selectedItemKey ?? "",
      undefined,
    );

    return {
      channels: state.channels.data,
      channel: state.channel.data,
      selectedChannel: state.channels.selectedChannel,
      selectedSeasonId,
      selectedSeason,
      selectedItem,
    };
  }, shallowEqual);

  const handleSelect = ({
    type,
    payload,
  }: {
    type: selectionType;
    payload: any;
  }) => {
    switch (type) {
      case "EPISODE":
        dispatch(selectItem(payload));
        break;
      case "SEASON":
        dispatch(selectSeason(payload.id));
        break;
      case "CHANNEL":
        dispatch(clearSeason());
        dispatch(selectChannel(payload.id));
        break;
      default:
    }
  };

  React.useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  React.useEffect(() => {
    if (!selectedChannel && typeof selectedChannel !== "number") return;
    dispatch(getChannel(selectedChannel as number));
  }, [dispatch, selectedChannel]);

  return (
    <div className={styles.App}>
      <header></header>
      <main>
        <div>
          <Channels
            channels={channels}
            onSelect={(id: number) =>
              handleSelect({
                type: "CHANNEL",
                payload: { id },
              })
            }
          />
        </div>
        <div>
          {channel?.episodes?.map((s: ISeason, idx: number) => {
            return (
              <Season
                key={idx}
                seasonNumber={idx + 1}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect({
                    type: "SEASON",
                    payload: { id: idx },
                  });
                }}
              />
            );
          })}
        </div>
        {selectedSeasonId !== undefined && (
          <EpisodeList
            episodes={[
              ...selectedSeason.trailer,
              ...selectedSeason.full,
              ...selectedSeason.bonus,
            ]}
            onSelectItem={(epData: any) => {
              handleSelect({
                type: "EPISODE",
                payload: epData,
              });
            }}
          />
        )}
      </main>
      <div className={styles.player}>{<Episode {...selectedItem} />}</div>
    </div>
  );
}
