import React from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard, { type MediaItem } from '../components/HorizontalScrollCard'
import useFetch from '../hooks/useFetch'
import Footer from '../components/Footer'
import type { RootState } from '../app/store'

function Home(): React.ReactElement {
  const trendingData = useSelector((state: RootState) => state.movieo.bannerData)
  const { data: nowPlayingData } = useFetch<MediaItem>("/movie/now_playing")
  const { data: topRatedData } = useFetch<MediaItem>("/movie/top_rated")
  const { data: popularTVData } = useFetch<MediaItem>("/tv/popular")
  const { data: onTheAirData } = useFetch<MediaItem>("/tv/on_the_air")

  return (
    <>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true} />
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"} />
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated"} media_type={"movie"} />
      <HorizontalScrollCard data={popularTVData} heading={"Popular TV Shows"} media_type={"tv"} />
      <HorizontalScrollCard data={onTheAirData} heading={"On The Air"} media_type={"tv"} />
      <Footer />
    </>
  )
}

export default Home