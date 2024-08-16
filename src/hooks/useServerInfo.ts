import { Namespace, StatusList } from '@/api'
import { useEffect, useState } from 'react'

export default function useServerInfo() {
    const [infoData, setInfoData] = useState<StatusList>()
    const [namespaces, setNameSpaces] = useState<Namespace[]>([])
    useEffect(() => {
        const cachedData = localStorage.getItem('currServer')
        if(cachedData){
            const parsedData = JSON.parse(cachedData);
            setInfoData(parsedData.infoData)
            setNameSpaces(parsedData.namespaces)
        }
    }, [])

    function rehydrateData(newNamespaces: Namespace[]){
        const cachedData = localStorage.getItem('currServer')
        if(cachedData){
            const parsedData = JSON.parse(cachedData);
            parsedData.namespaces = newNamespaces
            localStorage.setItem('currServer', JSON.stringify(parsedData))
        }
    }
    return { infoData, namespaces, rehydrateData }

}
