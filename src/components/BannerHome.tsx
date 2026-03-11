import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import type { RootState } from '../app/store';

function BannerHome(): React.ReactElement {
    const bannerData = useSelector((state: RootState) => state.movieo.bannerData)
    const imageURL = useSelector((state: RootState) => state.movieo.imageURL)
    const [currentImage, setCurrentImage] = useState<number>(0)

    const handleNext = (): void => {
        if(currentImage < bannerData.length - 1){
            setCurrentImage((preve: number) => preve + 1)
        }
    }

    const handlePrevious = (): void => {
        if(currentImage > 0){
            setCurrentImage((preve: number) => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(currentImage < bannerData.length - 1){
                handleNext()
            } else {
                setCurrentImage(0)
            }
        }, 5000);

        return () => clearInterval(interval)
    }, [bannerData, imageURL, currentImage])

    return (
        <section className='h-full w-full'>
            <div className='flex min-h-svh max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((data, index) => {
                        return(
                            <div key={data.id + "bannerHome" + index} className='min-w-full min-h-112.5 lg:min-h-full overflow-hidden relative group transition-all' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <div className='w-full h-full'>
                                    <img
                                        src={imageURL + data.backdrop_path}
                                        alt={data.title ?? data.name ?? 'Banner image'}
                                        className='h-full w-full object-cover'
                                    />
                                </div>

                                <div className='absolute top-0 h-full w-full hidden items-center justify-between px-4 group-hover:lg:flex'>
                                    <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-xl z-10 text-black cursor-pointer'>
                                        <FaCircleArrowLeft />
                                    </button>
                                    <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl z-10 text-black cursor-pointer'>
                                        <FaCircleArrowRight />
                                    </button>
                                </div>

                                <div className='absolute top-0 w-full h-full bg-linear-to-t from-neutral-900 to bg-transparent'>
                                </div>

                                <div className='ml-1 mx-auto'>
                                    <div className='w-full absolute bottom-0 max-wd-md px-3'>
                                        <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{(data?.title || data?.name) as string}</h2>
                                        <p className='md:text-ellipsis line-clamp-3 my-1 max-w-xl'>{data.overview}</p>
                                        <div className='flex items-center gap-4'>
                                            <p>Rating : {Number(data.vote_average as number).toFixed(1)}+</p>
                                            <span>|</span>
                                            <p>View : {Number(data.popularity as number).toFixed(0)}</p>
                                        </div>
                                        <button className='px-4 py-2 text-black font-bold rounded mt-3 hover:bg-linear-to-l from-red-500 to bg-orange-500 shadown-md transition-all hover:scale-105'>
                                            Play Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default BannerHome