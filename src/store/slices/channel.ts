import {
  createAsyncThunk,
  createSlice,
  Slice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { convertFeed, getRssFeed } from "../../lib/channel";
import { RootState, AppDispatch } from "../types";
import { Feed, EpisodeTypes } from "../../lib/channel/types";

type SliceState = {
  request: string;
  data: any;
  message: string;
  selectedItem: undefined | string;
  selectedSeason: undefined | number;
};
const initialState: SliceState = {
  request: "idle",
  selectedItem: undefined,
  data: {},
  selectedSeason: undefined,
  message: "",
};
export const getChannel = createAsyncThunk<
  Feed,
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

const slice: Slice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    selectSeason: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectSeason: action.payload,
      };
    },
    selectItem: (
      state,
      action: PayloadAction<{
        type: EpisodeTypes;
        item: number;
      }>,
    ) => {
      const { type, item } = action.payload;
      const itemPath = `${type}.${item}`;
      return {
        ...state,
        selectedItem: itemPath,
      };
    },
    deselectSeason: (state, action: PayloadAction<undefined>) => ({
      ...state,
      selectSeason: undefined,
    }),
    deselectItem: (state, action: PayloadAction<undefined>) => ({
      ...state,
      selectedItem: undefined,
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

export const clearSeason = createAsyncThunk<
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("channel/clearSeason", async (_, { dispatch }) => {
  await dispatch(deselectItem(void 0));
  await dispatch(deselectSeason(void 0));
});

export const clearItem = createAsyncThunk<
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("channel/clearSeason", async (_, { dispatch }) => {
  await dispatch(deselectItem(void 0));
});

export default slice;
