import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import MovieNavigation from "./components/MovieNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./app/movieoSlice";
import type { AppDispatch } from "./app/store";

interface TrendingResult {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  media_type?: string;
  [key: string]: unknown;
}

interface ConfigurationResponse {
  images: {
    secure_base_url: string;
    [key: string]: unknown;
  };
}

function App(): React.ReactElement {
  const dispatch = useDispatch<AppDispatch>();

  const fetchTrendData = async (): Promise<void> => {
    try {
      const response = await axios.get<{ results: TrendingResult[] }>('/trending/all/week');
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
  }

  const fetchConfiguration = async (): Promise<void> => {
    try {
      const response = await axios.get<ConfigurationResponse>('/configuration');
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTrendData();
    fetchConfiguration();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <MovieNavigation />
      {/* <Footer /> */}
    </main>
  )
}

export default App;