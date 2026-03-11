import React from 'react'
import { IoClose } from "react-icons/io5";
import useFetchDetails from '../hooks/useFetchDetails';

interface VideoResult {
  key: string;
  name: string;
  site: string;
  type: string;
  [key: string]: unknown;
}

interface VideoData {
  results?: VideoResult[];
  [key: string]: unknown;
}

interface VideoPlayProps {
  data: {
    id: number;
    [key: string]: unknown;
  };
  close: () => void;
  media_type: string;
}

function VideoPlay({ data, close, media_type }: VideoPlayProps): React.ReactElement {

  const { data: videoData } = useFetchDetails<VideoData>(`/${media_type}/${data?.id}/videos`)

  console.log("videoData:", videoData)
  console.log("video key:", videoData?.results?.[0]?.key)

  return (
    <section className='fixed bg-white/20 top-0 right-0 bottom-0 left-0 z-40 flex justify-center items-center'>
      <div className='bg-black w-full max-h-[80vh] lg:h-[80vh] max-w-5xl aspect-video relative'>

        <button onClick={close} className='absolute right-0 -mt-1 text-3xl text-white'>
          <IoClose />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results?.[0]?.key}`}
          className='w-full h-full'
          frameBorder="0"
          allowFullScreen
        />

      </div>
    </section>
  )
}

export default VideoPlay