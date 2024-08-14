import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, Grid, TextField, Typography, Button } from '@mui/material';

export interface CreateNewDatabaseProps{
    handleClose: (value: boolean) => void,
    open: boolean 
}

const Title = styled(Typography)({
  fontSize: '16px',
  width: '20%',
  fontFamily: 'Mulish',
  fontWeight: 500
});

const Heading = styled(Typography)({
  fontSize: '16px',
  fontFamily:"Mulish",
  fontWeight: 700
})

export default function CreateNewDatabase({ handleClose, open }: CreateNewDatabaseProps) {
  return (
    <Dialog  maxWidth="md" onClose={handleClose} open={open}>
        <DialogTitle fontWeight={700} color="secondary.contrastText" >Create a new database</DialogTitle>
        <DialogContent>
          <DialogContentText fontSize="14px" fontWeight={400} id="alert-dialog-slide-description">
            새로운 데이터베이스를 생성하기 위해 데이터베이스의 유형을 선택하고, 설치 경로와 Port를 입력해주세요.
            추가적으로 최소/최대 메모리 사용량을 입력하면, 이에 맞게 데이터베이스가 실행됩니다.
          </DialogContentText>
          <Grid marginTop={4} container direction="column">
              <Typography marginBottom={2} color="info" fontSize="16px" fontFamily="Mulish" fontWeight={700} > Required</Typography>
              <Grid item container  direction="row">
                <Title color="info" >Database Type</Title>
                <Heading color="info.light" >Blazegraph</Heading>
              </Grid>
              <Grid item container alignItems="center" direction="row">
                <Title color="info" >Port</Title>
                <TextField sx={{ marginBottom: '10px', borderWidth: '1px', borderColor: 'secondary.main' }} />
              </Grid>
          </Grid>
          <Grid marginTop={4} container direction="column">
              <Heading marginBottom={2} color="info">Optional</Heading>
              <Grid item container alignItems="center" direction="row">
                <Title color="info" sx={{ width: '40%' }}>Minimum Memory Usage(-Xms)</Title>
                <TextField type="number" sx={{ marginBottom: '10px', borderWidth: '1px', borderColor: 'secondary.main' }} />
              </Grid>
              <Grid item container alignItems="center" direction="row">
                <Title color="info" sx={{ width: '40%' }}>Maximum Memory Usage(-Xmx)</Title>
                <TextField type="number" sx={{  borderWidth: '1px', borderColor: 'secondary.main' }} />
              </Grid>
          </Grid>
          <DialogActions sx={{ justifyContent: 'center' }} >
            <Button sx={{ width: '246px' }} variant="contained" color="blue">Create Database</Button>
          </DialogActions>
        </DialogContent>
    </Dialog>
  )
}
