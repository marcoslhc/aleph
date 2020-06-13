import {
  createAsyncThunk,
  createSlice,
  Slice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { convertFeed, getRssFeed } from "../../lib/channel";
import { RootState, AppDispatch } from "../types";
import { Channel, EpisodeTypes } from "../../lib/channel/types";

type SliceState = {
  request: string;
  data: any;
  message: string;
  selectedItemKey: undefined | string;
  selectedSeasonId: undefined | number;
};
const initialState: SliceState = {
  request: "idle",
  selectedItemKey: undefined,
  data: {},
  selectedSeasonId: undefined,
  message: "",
};
export const getChannel = createAsyncThunk<
  Channel,
  number,
  { dispatch: AppDispatch; state: RootState }
>("feed/getChannel", async (id, { getState }) => {
  const { url } = getState().channels.data[id];
  try {
    const f = await getRssFeed(url);
    return convertFeed(f);
  } catch (e) {
    console.log(e.toString());
    throw e;
  }
});

const slice: Slice<SliceState> = createSlice({
  name: "channel",
  initialState,
  reducers: {
    selectSeason: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedSeasonId: action.payload,
      };
    },
    selectItem: (
      state,
      action: PayloadAction<{
        season: number;
        type: EpisodeTypes;
        id: number;
      }>,
    ) => {
      const { season, type, id } = action.payload;
      const itemPath = `${season}.${type}.${id}`;
      return {
        ...state,
        selectedItemKey: itemPath,
      };
    },
    deselectSeason: (state, action: PayloadAction<undefined>) => ({
      ...state,
      selectedSeasonId: undefined,
    }),
    deselectItem: (state, action: PayloadAction<undefined>) => ({
      ...state,
      selectedItemKey: undefined,
    }),
  },
  extraReducers: {
    [getChannel.pending.type]: (state, action: PayloadAction<undefined>) => ({
      ...state,
      request: "pending",
    }),
    [getChannel.fulfilled.type]: (state, action: PayloadAction<any>) => ({
      ...state,
      request: "success",
      data: action.payload,
    }),
    [getChannel.rejected.type]: (state, action: PayloadAction<string>) => ({
      ...state,
      request: "error",
      data: {},
      message: action.payload,
    }),
  },
});

export const {
  actions: { selectItem, selectSeason, deselectItem, deselectSeason },
} = slice;

export const clearSeason = createAsyncThunk<void>(
  "channel/clearSeason",
  async (_, { dispatch }) => {
    await dispatch(deselectItem(void 0));
    await dispatch(deselectSeason(void 0));
  },
);

export const clearItem = createAsyncThunk<void>(
  "channel/clearSeason",
  async (_, { dispatch }) => {
    await dispatch(deselectItem(void 0));
  },
);

export default slice;
