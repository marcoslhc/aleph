import {
  createSlice,
  createAsyncThunk,
  Slice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../types";

type ChannelList = Array<{
  title: string;
  url: string;
  image: {
    url: string;
    title: string;
  };
}>;
export const getChannels = createAsyncThunk<
  ChannelList,
  never,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("feeds/getChannels", async () => {
  return await Promise.resolve([
    {
      title: "Revisionist History",
      url: "https://feeds.megaphone.fm/revisionisthistory",
      image: {
        url:
          "https://images.megaphone.fm/4794iDSpy65Iw1xbpT5GyvJmAH6LeyhVx0kX18dCIN4/plain/s3://megaphone-prod/podcasts/1427a2f4-2674-11e6-a3d7-cf7ee2a2c03c/image/uploads_2F1560353177555-sxxs9t8ht7e-2310281f075c6384ff9e252ff5ab26a7_2FRH%2BTile%2BArtwork.jpg",
        title: "Revisionist History",
      },
    },
    {
      title: "Family Ghosts",
      url: "https://feeds.megaphone.fm/familyghosts",
      image: {
        url:
          "https://images.megaphone.fm/SlWT5KexKSn-iaXpL8yoLJ-XoCU2vk_WeWL4VoINpgI/plain/s3://megaphone-prod/podcasts/ae629f74-fa11-11e6-b53b-9fe143e07991/image/uploads_2F1586215873090-2j2zov2k865-e5bb562768b758e8a4933f9c8ea55e1d_2FFamily%2BGhost%2BLogo%2B13.5_WALT.jpg",
        title: "Family Ghosts",
      },
    },
    {
      title: "Philosophize This!",
      url: "http://philosophizethis.libsyn.com/rss",
      image: {
        url:
          "http://static.libsyn.com/p/assets/1/d/9/4/1d946f34af4d1ee6/logo1.jpg",
        title: "Philosophize This!",
      },
    },
  ]);
});

interface SliceState {
  request: string;
  data: any[];
  message: string;
  selectedChannel: undefined | number;
}

const initialState: SliceState = {
  request: "idle",
  data: [],
  message: "",
  selectedChannel: undefined,
};

const slice: Slice<SliceState> = createSlice({
  name: "channels",
  initialState,
  reducers: {
    selectChannel: (state, action: PayloadAction<number>) => ({
      ...state,
      selectedChannel: action.payload,
    }),
    deselectChannel: (state, action: PayloadAction<undefined>) => ({
      ...state,
      selectedChannel: undefined,
    }),
  },
  extraReducers: {
    [getChannels.pending.type]: state => state,
    [getChannels.fulfilled.type]: (state, action) => ({
      ...state,
      data: action.payload,
      message: "",
      request: "fulfilled",
    }),
    [getChannels.rejected.type]: (state, action) => ({
      ...state,
      data: [],
      message: action.payload,
      request: "rejected",
    }),
  },
});

export const {
  actions: { selectChannel, deselectChannel },
} = slice;

export const clearChannel = createAsyncThunk<void>(
  "channels/clearChannel",
  async (_, { dispatch }) => {
    await dispatch(deselectChannel(void 0));
  },
);

export default slice;
