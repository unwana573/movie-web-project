import axios from "axios"
import { useEffect, useState } from "react"

const useFetchDetails = <T = unknown>(endpoint: string): { data: T | null; loading: boolean } => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = async (): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.get<T>(endpoint)
            setData(response.data)
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

export default useFetchDetails