import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  searches: [] as string[],
};

type State = typeof initialState;

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state: State, action: PayloadAction<string>) => {
      let searches = state.searches.filter(
        (s) => s.trim() !== action.payload.toLowerCase()
      );
      searches.unshift(action.payload);
      return {
        ...state,
        searches: searches.slice(0, 5),
      };
    },

    clearSearch: (state: State) => {
      return {
        ...state,
        searches: [],
      };
    },

    removeSearch: (state: State, action: PayloadAction<number>) => {
      let searches = [...state.searches];
      searches.splice(action.payload, 1);
      return {
        ...state,
        searches,
      };
    },
  },
});

export const { addSearch, clearSearch, removeSearch } = searchSlice.actions;
export default searchSlice.reducer;
