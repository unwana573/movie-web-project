import React, { useRef, useState } from 'react'
import Card from './Card'
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6'

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  poster_path?: string;
  vote_average?: number;
  popularity?: number;
  media_type?: string;
  [key: string]: unknown;
}

interface HorizontalScrollCardProps {
  data?: MediaItem[];
  heading: string;
  trending?: boolean;
  media_type?: string;
}

function HorizontalScrollCard({ data = [], heading, trending, media_type }: HorizontalScrollCardProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAtStart, setIsAtStart] = useState<boolean>(true)
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false)

  const SCROLL_AMOUNT = 420

  const handleScroll = (): void => {
    const el = containerRef.current
    if (!el) return
    setIsAtStart(el.scrollLeft <= 0)
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  const handleNext = (): void => {
    if (containerRef.current) containerRef.current.scrollLeft += SCROLL_AMOUNT
  }

  const handlePrev = (): void => {
    if (containerRef.current) containerRef.current.scrollLeft -= SCROLL_AMOUNT
  }

  return (
    <div className='w-full px-4 sm:px-6 lg:px-10 xl:px-14 my-8 lg:my-12'>
      {/* Heading row */}
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight capitalize'>
          {heading}
        </h2>
        {/* Mobile arrow buttons alongside heading */}
        <div className='flex items-center gap-2 lg:hidden'>
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            className={`p-1.5 rounded-full transition-all duration-200 ${
              isAtStart
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-white hover:text-yellow-400 active:scale-90'
            }`}
          >
            <FaCircleArrowLeft size={22} />
          </button>
          <button
            onClick={handleNext}
            disabled={isAtEnd}
            className={`p-1.5 rounded-full transition-all duration-200 ${
              isAtEnd
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-white hover:text-yellow-400 active:scale-90'
            }`}
          >
            <FaCircleArrowRight size={22} />
          </button>
        </div>
      </div>

      {/* Scroll container */}
      <div className='relative group'>
        {/* Left fade gradient */}
        <div
          className={`absolute left-0 top-0 h-full w-8 sm:w-12 bg-linear-to-r from-black/60 to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
            isAtStart ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Right fade gradient */}
        <div
          className={`absolute right-0 top-0 h-full w-8 sm:w-12 bg-linear-to-l from-black/60 to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
            isAtEnd ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Cards row */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className='flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scroll-smooth scrollbar-none pb-2'
        >
          {data.map((item, index) => (
            <div
              key={item.id + heading + index}
              className='flex-none w-35 sm:w-40 md:w-45 lg:w-50 xl:w-52.5'
            >
              <Card data={item} trending={trending} index={index + 1} media_type={media_type} />
            </div>
          ))}
        </div>

        {/* Desktop side arrow buttons */}
        <button
          onClick={handlePrev}
          disabled={isAtStart}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30
            hidden lg:flex items-center justify-center
            w-9 h-9 rounded-full bg-white shadow-lg
            transition-all duration-200
            ${isAtStart
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95'
            }`}
        >
          <FaCircleArrowLeft className='text-black text-lg' />
        </button>

        <button
          onClick={handleNext}
          disabled={isAtEnd}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30
            hidden lg:flex items-center justify-center
            w-9 h-9 rounded-full bg-white shadow-lg
            transition-all duration-200
            ${isAtEnd
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95'
            }`}
        >
          <FaCircleArrowRight className='text-black text-lg' />
        </button>
      </div>
    </div>
  )
}

export default HorizontalScrollCard