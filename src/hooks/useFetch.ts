import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = <T = unknown>(endpoint: string): { data: T[]; loading: boolean } => {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = async (): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.get<{ results: T[] }>(endpoint)
            setData(response.data.results)
        } catch (error) {
            console.error("error", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [endpoint])

    return { data, loading }
}

export default useFetch