import { Namespace, StatusList } from '@/api'
import { useEffect, useState } from 'react'

export default function useServerInfo() {
    const [infoData, setInfoData] = useState<StatusList>(null)
    const [namespaces, setNameSpaces] = useState<Namespace[]>([])
    useEffect(() => {
        const cachedData = localStorage.getItem('currServer')
        if(cachedData){
            const parsedData = JSON.parse(cachedData);
            setInfoData(parsedData.infoData)
            setNameSpaces(parsedData.namespaces)
        }
    }, [])
    return { infoData, namespaces }

}
