import fullAppReducer, { FullAppState } from "@/reducers/fullAppReducer";
import { configureStore } from "@reduxjs/toolkit";

// ! All reducers types are defined here to use in selectors
export interface StoreState {
  fullAppReducer: FullAppState;
}

export const store = configureStore({
  reducer: {
    fullAppReducer,
  },
});
