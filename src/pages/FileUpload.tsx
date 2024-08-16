import { Grid, Paper, Typography, styled, Button, useTheme, IconButton as IconButtonMui } from '@mui/material'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import UploadIcon from '@mui/icons-material/Upload';
import Checkbox from '@mui/material/Checkbox';
import { useRef, useState } from 'react';
import useServerInfo from '@/hooks/useServerInfo';
import { uploadTtl } from '@/api';

const InfoBox = styled(Paper)(() => ({
    marginTop: '40px', minHeight: '134px', marginRight: '48px',
    padding: '37px 42px',
    display: 'flex',
    flexDirection: 'row',
    width: '513px'
}))

const ImportButton = styled(Button)(() => ({
    fontFamily: 'Mulish', 
    width: '97px',
    height: '42px',
    borderRadius: '8px',
    backgroundColor: '#007EFF',
}))

const GridRow = styled(Grid)(() => ({ 
    marginTop: '11px', 
    height: '53px', 
    backgroundColor: 'white', 
    border: '1px solid #E9EFF4' 
}))

const IconButton = styled(IconButtonMui)(() => ({
    backgroundColor: '#E9EFF4'
}))

export default function FileUpload() {
    const { palette } = useTheme()
    const fileRef = useRef<HTMLInputElement>(null)
    const [files, setFiles] = useState<File[]>([])
    const [checklist, setChecklist] = useState<boolean[]>([])
    const { infoData } = useServerInfo()
    const [loading, setLoading] = useState(false)

     const currNamespace = localStorage.getItem('currNamespace') || 'kb'

     const url = infoData ? `${infoData.scheme}://${infoData.hostname}:${infoData.port}` : ''

    function formatFileSize(file: File): string {
        let fileSizeInBytes = file.size;
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let index = 0;
      
        while (fileSizeInBytes >= 1024 && index < units.length - 1) {
          fileSizeInBytes /= 1024;
          index++;
        }
      
        return `${fileSizeInBytes.toFixed(2)} ${units[index]}`;
    }

    function onDeleteFile(index:number){
        const newFiles = files.filter((_, index2) => index2 !== index)
        setFiles(newFiles)

    }

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>){
        console.log('file changes', { files: event.target.files})
        const targetFiles = event.target.files
        if(targetFiles?.length){
            const arrFiles =Array.from(targetFiles);
            setFiles([...files, ...arrFiles])
            setChecklist(arrFiles.map(() => false))
        }
    }


    function onImport(){
        if(!loading && url){
            fileRef.current?.click()
        }
    }

    function onCheckClick(index: number){
        const newCheck = [...checklist]
        newCheck[index] = !newCheck[index]
        setChecklist(newCheck)
    }

    async function uploadFiles(files: File[]){
        try{
            setLoading(true)
            await uploadTtl({
                files,
                namespace: currNamespace,
                url
            })
            alert('successfully sent files')
        }catch(err){
            console.log('upload file', err)
            alert('An error on uploading file')
        }finally{
            setLoading(false)
        }
    }

    async function uploadSingle(file: File){
        await uploadFiles([file])
    }

    async function onSend(){
        
        const selectedFiles = checklist
        .map((check, index) => check ? files[index] : null)
        .filter((item) => item)

        await uploadFiles((selectedFiles as File[]))
        //console.log({ files, checklist, selectedFiles, url, currNamespace})
    }

    console.log({ url,})

    return (
        <Grid container direction="column">
            <InfoBox onClick={onImport} sx={{ cursor: 'pointer', alignItems: 'center' }} elevation={1}>
                <InsertDriveFileOutlinedIcon sx={{ fontSize: '60px' }}  />
                <Grid flex={1} marginLeft="22px" container direction="column">
                    <Typography fontFamily="Mulish" fontWeight={700} fontSize={"20px"} color={palette.secondary.contrastText}>File Upload</Typography>
                    <Typography fontFamily="Mulish" fontWeight={400} fontSize={"16px"}>rdf/xml, ttl, ntriples, json-ld의 파일 형식을 
                    지원하고, 여러 파일의 선택이 가능합니다.</Typography>
                </Grid>
            </InfoBox>
            <p>Current URl: {url}</p>
            <p>Current Namespace: {currNamespace}</p>
            <Grid marginTop="29px" paddingRight="59px" container item>
                <Grid container width="100%">
                    <Grid xs={1} item>
                        <input
                            type="file"
                            ref={fileRef}
                            multiple
                            onInput={onFileChange}
                            style={{
                                display: 'none',
                            }}
                            accept=".ttl"
                        />
                        <ImportButton disabled={loading || !url || files.length === 0} onClick={onSend} variant="contained">Import</ImportButton>
                    </Grid>
                    <Grid container alignItems="flex-end" flex={1} item>
                        <Typography fontSize="13px" fontWeight={400} color="warning.main" >File</Typography>
                    </Grid>
                    <Grid container alignItems="flex-end" xs={1} item>
                        <Typography fontSize="13px" fontWeight={400} color="warning.main" >File size</Typography>
                    </Grid>
                    <Grid container alignItems="flex-end" xs={1} item>
                        <Typography fontSize="13px" fontWeight={400} color="warning.main" >Delete</Typography>
                    </Grid>
                    <Grid container alignItems="flex-end" xs={1} item>
                        <Typography fontSize="13px" fontWeight={400} color="warning.main" >Import</Typography>
                    </Grid>
                </Grid>
                {files.map((file, index) => (
                    <GridRow key={file.name + '-' + index} container>
                       <Grid xs={1} item>
                            <Checkbox onClick={() => onCheckClick(index)} value={checklist[index]} />
                       </Grid>
                       <Grid container alignItems="center" flex={1} item>
                           <Typography fontSize="13px" fontWeight={400} color="warning.main" >{file.name}</Typography>
                       </Grid>
                       <Grid container alignItems="center" xs={1} item>
                           <Typography fontSize="13px" fontWeight={400} color="warning.main" >{formatFileSize(file)}</Typography>
                       </Grid>
                       <Grid container alignItems="center" xs={1} item>
                               <IconButton onClick={() => onDeleteFile(index)} disabled={loading} >
                                   <CloseRoundedIcon color="warning" />
                               </IconButton>
                       </Grid>
                       <Grid container alignItems="center" xs={1} item>
                               <IconButton onClick={() => uploadSingle(file)} disabled={loading}>
                                   <UploadIcon color="warning" />
                               </IconButton>
                       </Grid>
                   </GridRow>
                ))}
             
            </Grid>
        </Grid>
    )
}
