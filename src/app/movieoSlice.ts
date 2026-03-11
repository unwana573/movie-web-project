import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BannerItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
  popularity?: number;
  [key: string]: unknown;
}

interface MovieoState {
  bannerData: BannerItem[];
  imageURL: string;
}

const initialState: MovieoState = {
  bannerData: [],
  imageURL: "",
};

export const movieoSlice = createSlice({
  name: "movieo",
  initialState,
  reducers: {
    setBannerData: (state, action: PayloadAction<BannerItem[]>) => {
      state.bannerData = action.payload;
    },
    setImageURL: (state, action: PayloadAction<string>) => {
      state.imageURL = action.payload;
    },
  },
});

export const { setBannerData, setImageURL } = movieoSlice.actions;

export default movieoSlice.reducer;