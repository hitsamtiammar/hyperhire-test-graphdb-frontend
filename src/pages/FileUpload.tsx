import { Grid, Paper, Typography, styled, Button, useTheme, IconButton as IconButtonMui } from '@mui/material'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import UploadIcon from '@mui/icons-material/Upload';
import Checkbox from '@mui/material/Checkbox';

const InfoBox = styled(Paper)(() => ({
    marginTop: '40px', minHeight: '134px', marginRight: '48px',
    padding: '37px 42px',
    display: 'flex',
    flexDirection: 'row',
    width: '513px'
}))

const ImportButton = styled(Button)(({ theme: { palette: { blue } } }) => ({
    fontFamily: 'Mulish', 
    width: '97px',
    height: '42px',
    borderRadius: '8px',
    backgroundColor: blue['main'],
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
  return (
    <Grid container direction="column">
        <InfoBox sx={{ alignItems: 'center' }} elevation={1}>
            <InsertDriveFileOutlinedIcon sx={{ fontSize: '60px' }}  />
            <Grid flex={1} marginLeft="22px" container direction="column">
                <Typography fontFamily="Mulish" fontWeight={700} fontSize={"20px"} color={palette.secondary.contrastText}>File Upload</Typography>
                <Typography fontFamily="Mulish" fontWeight={400} fontSize={"16px"}>rdf/xml, ttl, ntriples, json-ld의 파일 형식을 
                지원하고, 여러 파일의 선택이 가능합니다.</Typography>
            </Grid>
        </InfoBox>
        <Grid marginTop="29px" paddingRight="59px" container item>
            <Grid container width="100%">
                <Grid xs={1} item>
                    <ImportButton variant="contained">Import</ImportButton>
                </Grid>
                <Grid container alignItems="flex-end" flex={1} item>
                    <Typography fontSize="13px" fontWeight={400} color="warning.main" >File</Typography>
                </Grid>
                <Grid container alignItems="flex-end" xs={1} item>
                    <Typography fontSize="13px" fontWeight={400} color="warning.main" >Named Graph ID</Typography>
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
            <GridRow container>
                <Grid xs={1} item>
                   <Checkbox />
                </Grid>
                <Grid container alignItems="center" flex={1} item>
                    <Typography fontSize="13px" fontWeight={400} color="warning.main" >address-triples-data3.ttl</Typography>
                </Grid>
                <Grid container alignItems="center" xs={1} item>
                    <Typography fontSize="13px" fontWeight={400} color="warning.main" >graph1</Typography>
                </Grid>
                <Grid container alignItems="center" xs={1} item>
                    <Typography fontSize="13px" fontWeight={400} color="warning.main" >100MB</Typography>
                </Grid>
                <Grid container alignItems="center" xs={1} item>
                        <IconButton sx={{ backgroundColor: '#E9EFF4' }}>
                            <CloseRoundedIcon color="warning" />
                        </IconButton>
                </Grid>
                <Grid container alignItems="center" xs={1} item>
                        <IconButton sx={{ backgroundColor: '#E9EFF4' }}>
                            <UploadIcon color="warning" />
                        </IconButton>
                </Grid>
            </GridRow>
            <GridRow container>
                <Grid xs={1} item>
                   <Checkbox />
                </Grid>
                <Grid container alignItems="center" flex={1} item>
                    <Typography fontSize="13px" fontWeight={400} color="warning.main" >address-triples-data3.ttl</Typography>
                </Grid>
                <Grid container alignItems="center" xs={1} item>
                    <Typography fontSize="13px" fontWeight={400} color="warning.main" >graph1</Typography>
                </Grid>
                <Grid container alignItems="center" xs={1} item>
                    <Typography fontSize="13px" fontWeight={400} color="warning.main" >100MB</Typography>
                </Grid>
                <Grid container alignItems="center" xs={1} item>
                        <IconButton >
                            <CloseRoundedIcon color="warning" />
                        </IconButton>
                </Grid>
                <Grid container alignItems="center" xs={1} item>
                        <IconButton>
                            <UploadIcon color="warning" />
                        </IconButton>
                </Grid>
            </GridRow>
        </Grid>
    </Grid>
  )
}
