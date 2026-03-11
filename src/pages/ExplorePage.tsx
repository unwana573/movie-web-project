import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import axios from 'axios'
import Footer from '../components/Footer'

interface ExploreItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  media_type?: string;
  [key: string]: unknown;
}

function ExplorePage(): React.ReactElement {
  const params = useParams<{ explore: string }>()
  const [pageNo, setPageNo] = useState<number>(1)
  const [data, setData] = useState<ExploreItem[]>([])
  // const [totalPageNo, setTotalPageNo] = useState<number>(0)

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<{ results: ExploreItem[]; total_pages: number }>(
        `/discover/${params.explore}`,
        { params: { page: pageNo } }
      )
      setData((prev) => [...prev, ...response.data.results])
      // setTotalPageNo(response.data.total_pages)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleScroll = (): void => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setPageNo((prev) => prev + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className='pt-16 ml-7'>
        <div className='container mx-auto'>
          <h3 className='capitalize text-lg lg:text-2xl font-semibold my-3 ml-7'>
            Popular {params.explore}
          </h3>

          <div className='grid grid-cols-[repeat(auto-fit,220px)] gap-6 justify-center lg:justify-start'>
            {
              data.map((exploreData) => (
                <Card
                  data={exploreData}
                  key={exploreData.id + "exploreSection"}
                  media_type={params.explore}
                />
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ExplorePage