import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../store";

interface WrittenTodayState {
  value: boolean;
}

const initialState: WrittenTodayState = {
  value: false,
};

export const writtenTodaySlice = createSlice({
  name: "writtenToday",
  initialState,
  reducers: {
    setTrue: (state) => {
      state.value = true;
    },
    setFalse: (state) => {
      state.value = false;
    },
  },
});

export const { setTrue, setFalse } = writtenTodaySlice.actions;

export const selectWrittenToday = (state: RootState) =>
  state.writtenToday.value;
export default writtenTodaySlice.reducer;
