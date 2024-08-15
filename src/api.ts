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