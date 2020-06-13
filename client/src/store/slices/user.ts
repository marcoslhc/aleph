import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    email: "",
    isSignedIn: false,
  },
  reducers: {},
});

export default slice;
