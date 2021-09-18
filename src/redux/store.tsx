import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./reducers/darkModeSlice";
import writtenTodayReducer from "./reducers/writtenTodaySlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    writtenToday: writtenTodayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
