import * as React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "./styles.css";
import { getChannels, selectChannel } from "./store/slices/channels";
import { getChannel } from "./store/slices/channel";
import { Feed } from "./lib/channel/types";
import { Season } from "./components";

import {RootState} from "./store/types";

// const globalStateReducer = (state, action) => {
// switch (action.type) {
//   default:
//     return state
// }
// }
const Feeds = ({ feeds, onSelect }) =>
  feeds.length &&
  feeds.map((f: Feed, idx: number) => {
    return (
      <div
        key={idx}
        onClick={() => onSelect(idx)}
        style={{ display: "flex", flexFlow: "row" }}>
        <div
          style={{
            display: "flex",
          }}>
          <img
            style={{
              width: "150px",
              height: "150px",
            }}
            src={f.image.url}
            alt={f.image.title}
          />
        </div>
        <div>
          <div>{f.title}</div>
        </div>
      </div>
    );
  });

export default function App() {
  const dispatch = useDispatch();
  const { channels, channel, selectedChannel } = useSelector(
    (state: RootState) => ({
      channels: state.channels.data,
      selectedChannel: state.channels.selectedChannel,
      channel: state.channel.data,
    }),
    shallowEqual,
  );

  const handleSelect = (id: number) => {
    dispatch(selectChannel(id));
  };

  React.useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  React.useEffect(() => {
    if (!selectChannel) return;
    dispatch(getChannel(selectedChannel));
  }, [dispatch, selectedChannel])

  React.useEffect(() => {})

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Feeds feeds={channels} onSelect={handleSelect} />
      {channel?.episodes?.map((s, idx) => {
          return <Season number={idx + 1} episodes={[
            ...s.trailer,
            ...s.full,
            ...s.bonus
          ]} />;
        })}
    </div>
  );
}
