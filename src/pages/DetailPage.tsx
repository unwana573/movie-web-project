import React, { useState } from 'react'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import useFetch from "../hooks/useFetch"
import VideoPlay from '../components/VideoPlay'
import type { RootState } from '../app/store'
import type { MediaItem } from '../components/HorizontalScrollCard'

interface CastMember {
  name: string;
  profile_path: string | null;
  [key: string]: unknown;
}

interface CrewMember {
  name: string;
  job: string;
  [key: string]: unknown;
}

interface Credits {
  cast?: CastMember[];
  crew?: CrewMember[];
}

interface MovieDetail {
  id: number;
  title?: string;
  name?: string;
  tagline?: string;
  overview?: string;
  backdrop_path?: string;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  runtime?: number;
  status?: string;
  release_date?: string;
  revenue?: number;
  [key: string]: unknown;
}

interface PlayVideoData {
  id: number;
  [key: string]: unknown;
}

function DetailPage(): React.ReactElement {

  const params = useParams<{ media_type: string; id: string }>()
  const imageURL = useSelector((state: RootState) => state.movieo.imageURL)

  const { data } = useFetchDetails<MovieDetail>(`/${params?.media_type}/${params?.id}`)
  const { data: castData } = useFetchDetails<Credits>(`/${params?.media_type}/${params?.id}/credits`)
  const { data: similarData } = useFetch<MediaItem>(`${params?.media_type}/${params?.id}/similar`)
  const { data: recommendationData } = useFetch<MediaItem>(`${params?.media_type}/${params?.id}/recommendations`)

  const [playVideo, setPlayVideo] = useState<boolean>(false)
  const [playVideoId, setPlayVideoId] = useState<PlayVideoData | null>(null)

  const handlePlayVideo = (data: PlayVideoData): void => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".").join(",")
  const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el.name)?.join(",")

  return (
    <>
      <div>
        <div className='w-full h-100 relative'>
          <div className='w-full h-full hidden lg:block mt-16'>
            <img
              src={imageURL + data?.backdrop_path}
              alt={data?.title ?? data?.name ?? 'Backdrop'}
              className='h-full w-full object-cover'
            />
          </div>
          <div className='absolute w-full h-full top-0 bg-linear-to-t from-neutral-900/90 to-transparent'>
          </div>

          <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
            <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
              <img
                src={imageURL + data?.poster_path}
                alt={data?.title ?? data?.name ?? 'Poster'}
                className='h-80 w-60 object-cover rounded-2xl'
              />
              <button
                onClick={() => data && handlePlayVideo(data as PlayVideoData)}
                className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text:lg hover:bg-linear-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'
              >
                Play Now
              </button>
            </div>

            <div>
              <h2 className='text-2xl lg:text-4xl font-bold text-white'>
                {data?.title || data?.name}
              </h2>
              <p className='text-neutral-400'>{data?.tagline}</p>

              <Divider />
              <div className='flex items-center gap-3'>
                <p>Rating : {Number(data?.vote_average).toFixed(1)}</p>
                <span>|</span>
                <p>View : {Number(data?.vote_count).toFixed(1)}</p>
                <span>|</span>
                <p>Duration : {duration[0]}h {duration[1]}m</p>
              </div>

              <Divider />

              <div>
                <div>
                  <h3 className='text-xl font-bold text-white'>Overview</h3>
                  <p>{data?.overview}</p>

                  <Divider />

                  <div className='flex items-center gap-3 my-3 text-center'>
                    <p>Status : {data?.status}</p>
                    <span>|</span>
                    <p>Release date : {moment(data?.release_date).format("MMMM Do YYYY")}</p>
                    <span>|</span>
                    <p>Revenue : {Number(data?.revenue)}</p>
                  </div>

                  <Divider />
                </div>

                <div>
                  <p>
                    <span className='text-white'>Director :</span> {castData?.crew?.[0]?.name}
                  </p>
                  <Divider />
                  <p>
                    <span className='text-white'>Writer : {writer}</span>
                  </p>
                </div>

                <Divider />
                <h2 className='font-bold text-lg'>Cast : </h2>
                <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
                  {
                    castData?.cast?.filter(el => el?.profile_path).map((starCast, index) => (
                      <div key={index}>
                        <div>
                          <img
                            src={imageURL + starCast?.profile_path}
                            alt={starCast?.name ?? 'Cast member'}
                            className='w-24 h-24 object-cover rounded-full'
                          />
                        </div>
                        <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          <div>
            <HorizontalScrollCard data={similarData} heading={"Similar " + params?.media_type} media_type={params?.media_type} />
            <HorizontalScrollCard data={recommendationData} heading={"Recommendation " + params?.media_type} media_type={params?.media_type} />
          </div>

          {
            playVideo && playVideoId && (
              <VideoPlay data={playVideoId} close={() => { setPlayVideo(false); setPlayVideoId(null); }} media_type={params?.media_type ?? ""} />
            )
          }

          <Footer />
        </div>
      </div>
    </>
  )
}

export default DetailPage