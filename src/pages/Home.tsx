import { Box, Button, Grid, IconButton, Paper, Typography, styled } from '@mui/material'
import HeadingText from '@/components/common/HeadingText';
import CreateNewDatabaseDialog, { CreateNewDatabaseProps } from '@/dialog/CreateNewDatabaseDialog';
import ConnectWithExistingDatabase, { ConnectDbData } from '@/dialog/ConnectWithExistingDatabase';
import { Check, Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import CreateNewNamespace, { CreateNewNamespaceRequest } from '@/dialog/CreateNewNamespace';
import { connectToDatabase, createDatabase, CreateDbRequest, createNamespace, getNamespace, Namespace, StatusList } from '@/api';
     
const InfoBox = styled(Paper)(() => ({
    marginTop: '40px', height: '200px', marginRight: '48px',
    padding: '19px 24px'
}))

const GridRow = styled(Grid)(() => ({ 
    marginTop: '11px', 
    height: '53px', 
    backgroundColor: 'white', 
    border: '1px solid #E9EFF4',
    padding: '0px 25px',
    marginBottom: '10px'

}))

export default function Home() {
    const [openCreate, setOpenCreate] = useState(false)
    const [openExisting, setOpenExisting] = useState(false)
    const [openNamespace, setOpenNamespace] = useState(false)
    const [infoData, setInfoData] = useState<StatusList>(null)
    const [namespaces, setNameSpaces] = useState<Namespace[]>([])
    const [loading, setLoading] = useState(false)
    const [currNamespace, setCurrNamespace] = useState(localStorage.getItem('currNamespace') || 'kb')

    useEffect(() => {
        const cachedData = localStorage.getItem('currServer')
        if(cachedData){
            const parsedData = JSON.parse(cachedData);
            setInfoData(parsedData.infoData)
            setNameSpaces(parsedData.namespaces)
        }
    }, [])

    async function onSubmitCreateNew(data: CreateDbRequest){
        console.log('submit create new', { data })
        try{
            setLoading(true)
            const response = await createDatabase(data)
            if(response.status !== 'Success'){
                throw response;
            }
            alert('Successfully create new database, Wait for a while before the server is ready')
        }catch(err){
            console.log('ERR',{ err })
            alert('Failed to connect')
        }finally{
            setOpenCreate(false)
            setLoading(false)
        }
    }

    async function onSubmitConnect(data: ConnectDbData){
        try{
            setLoading(true)
            const response = await connectToDatabase({
                port: data.port,
                url: data.ipAddress
            })
            if(!response.status){
                throw response;
            }
            const statusList: StatusList = response.status_list;
            const namespacesData: Namespace[] = response.namespaces
            setInfoData(statusList)
            setNameSpaces(namespacesData)
            const storedData = {
                infoData: statusList,
                namespaces: namespacesData
            }
            localStorage.setItem('currServer', JSON.stringify(storedData))
        }catch(err){
            console.log('ERR',{ err })
            alert('Failed to connect')
        }finally{
            setOpenExisting(false)
            setLoading(false)
        }
    }

    async function onSubmitNamespace(data: CreateNewNamespaceRequest){
        try{
            setLoading(true)
            const url = `${infoData.scheme}://${infoData.hostname}:${infoData.port}`
            await createNamespace({
                name: data.name,
                url: url
            })
            const namespaceResponse = await getNamespace(url)
            const newNamespaces = namespaceResponse.namespace
            setNameSpaces(newNamespaces)

        }catch(err){
            console.log('ERR',{ err })
            alert('Failed to create new namespace')
        }finally{
            setOpenNamespace(false)
            setLoading(false)
        }
    }

    function renderInfoBox(){
        if(!infoData){
            return (
                <>
                  <Typography>이 관리도구와 연결된 데이터베이스가 없습니다.</Typography>
                  <Typography>위의 버튼을 눌러 새 데이터베이스를 생성하거나, 기존의 데이터베이스와 연결하세요.</Typography>
                </>
            )
        }
        return (
            <Grid container direction="column">
                <Grid container direction="row">
                    <Grid xs={4} container direction="column" item>
                        <Typography color="info" fontFamily="Mulish" fontWeight={700} fontSize="16px" >Basic Information</Typography>
                    </Grid>
                    <Grid item>
                        <Typography color="info" fontFamily="Mulish" fontWeight={700} fontSize="16px" >Additional Information</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={5} direction="row">
                    <Grid container spacing={2} direction="column" xs={4} item>
                        <Grid justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >Database Type</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px">{infoData.databasetype}</Typography>
                        </Grid>
                        <Grid  justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >IP Address</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{infoData.hostname}</Typography>
                        </Grid>
                        <Grid  justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >Port</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{infoData.port}</Typography>
                        </Grid>
                        <Grid  justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >Repositories</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{namespaces.length}</Typography>
                        </Grid>
                    </Grid>
                    <Grid spacing={1} container direction="column" xs={4} item>
                        <Grid justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >runningQueriesCount</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{infoData.runningQueriesCount}</Typography>
                        </Grid>
                        <Grid  justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >queryStartCount</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{infoData.queryStartCount}</Typography>
                        </Grid>
                        <Grid  justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >queryErrorCount</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{infoData.queryErrorCount}</Typography>
                        </Grid>
                        <Grid justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >queryDoneCount</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{infoData.queryDoneCount}</Typography>
                        </Grid>
                        <Grid justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >queryPerSecond</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{infoData.queryPerSecond}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} direction="column" xs={4} item>
                        <Grid justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >operatorTasksPerQuery</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px">{infoData.operatorTasksPerQuery}</Typography>
                        </Grid>
                        <Grid  justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >operatorStartCount</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px">{infoData.operatorStartCount}</Typography>
                        </Grid>
                        <Grid  justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >operatorHaltCount</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{infoData.operatorHaltCount}</Typography>
                        </Grid>
                        <Grid justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >operatorActiveCount</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px">{infoData.operatorActiveCount}</Typography>
                        </Grid>
                        <Grid justifyContent="space-between" container direction="row" item>
                            <Typography marginRight="38px" color="info" fontFamily="Mulish" fontWeight={500} fontSize="16px" >deadlineQueueSize</Typography>
                            <Typography color="info.light" fontFamily="Mulish" fontWeight={500} fontSize="16px" >{infoData.deadlineQueueSize}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    function onChoose(item: Namespace){
        setCurrNamespace(item.title)
        localStorage.setItem('currNamespace',item.title)
    }

    return (
        <Grid container direction="column">
            <Box display="flex" alignItems="center" flexDirection="row">
                <HeadingText onPlusClick={() => setOpenExisting(true)} text="Active Database Information" />
            </Box>
            <Button onClick={() => setOpenCreate(true)} variant="contained" sx={{ width: '200px' }} color="blue" >Create New Database</Button>
            <InfoBox elevation={1}>
                {renderInfoBox()}
            </InfoBox>
            <HeadingText onClick={() => setOpenNamespace(true)} marginTop="43px" text="Repository" />
            <Grid paddingRight="48px" container direction="column">
                {namespaces.map(item => (
                    <GridRow key={item.title} alignItems="center" container direction="row">
                        <Grid item xs={3}>
                            <Typography color="description">{item.title + `${item.title === currNamespace ? ' (used)' : ''}`}</Typography>
                        </Grid>
                        <Grid flex={1} item>
                            <Typography color="description">{item.sparqlEndpoint}</Typography>
                        </Grid>
                        <Grid container justifyContent="space-evenly" direction="row" item xs={3}>
                            <IconButton onClick={() => onChoose(item)} sx={{ backgroundColor: 'blue.light' }}>
                                <Check />
                            </IconButton>
                            <IconButton sx={{ backgroundColor: 'blue.light' }}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </GridRow>
                ))}
            </Grid>
            <CreateNewNamespace loading={loading} onSubmit={onSubmitNamespace} handleClose={() => setOpenNamespace(false)} open={openNamespace} />
            <CreateNewDatabaseDialog onSubmit={onSubmitCreateNew} open={openCreate} handleClose={() => setOpenCreate(false)} />
            <ConnectWithExistingDatabase loading={loading} onSubmit={onSubmitConnect} open={openExisting} handleClose={() => setOpenExisting(false)} />
        </Grid>
    )
}
