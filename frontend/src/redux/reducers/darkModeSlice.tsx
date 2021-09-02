import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../store";

interface DarkModeState {
  value: boolean;
}

const initialState: DarkModeState = {
  value: true,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    setDarkTrue: (state) => {
      state.value = true;
    },
    setDarkFalse: (state) => {
      state.value = false;
    },
  },
});

export const { toggle, setDarkTrue, setDarkFalse } = darkModeSlice.actions;

export const selectDarkMode = (state: RootState) => state.darkMode.value;
export default darkModeSlice.reducer;
