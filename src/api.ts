const BASE_URL = import.meta.env.VITE_API_ENDPOINT

export interface StatusList {
    databasetype: string
    deadlineQueueSize: number
    hostname: string
    operatorActiveCount: number
    operatorHaltCount: number
    operatorStartCount: number
    operatorTasksPerQuery: number
    port: number
    queryErrorCount: number
    queryPerSecond: number
    queryStartCount: number
    runningQueriesCount: number
    queryDoneCount: number
    scheme: string
}

export interface Namespace {
  sparqlEndpoint: string
  title: string
}

export interface CreateDbRequest {
    port: number
    minimumUsage: number
    maximumUsage: number
}

export interface CreateNamespaceRequest{
    url: string;
    name: string
}

export const connectToDatabase = async({ port, url }: { port: number, url: string }) => {
    const response = await fetch(`${BASE_URL}/connect`, {
        method: 'POST',
        body: JSON.stringify({ url, port }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data;
}

export const createDatabase = async(payload: CreateDbRequest) => {
    const response = await fetch(`${BASE_URL}/create-database`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data;
}

export const createNamespace = async(payload: CreateNamespaceRequest) => {
    const response = await fetch(`${BASE_URL}/create-namespace`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.text()
    return data;
}

export const getNamespace = async(url: string) => {
    const response = await fetch(`${BASE_URL}/get-namespace?url=${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data;
}