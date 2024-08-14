import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form'
import { Grid, Typography, Button } from '@mui/material';
import { Title, Heading, ModalTextField } from '@/components/common/modal';

export interface ConnectWithExistingDatabaseProps{
    handleClose: (value: boolean) => void;
    open: boolean;
    onSubmit: (data: object) => void
}


export default function ConnectWithExistingDatabase({ handleClose, open, onSubmit: onSubmitProps }: ConnectWithExistingDatabaseProps) {
    const methods = useForm({
        mode: 'onBlur',
        defaultValues: { 
            port: '',
            ipAddress: '',  
          },
      })
    
      const { register, formState: { errors }, handleSubmit } = methods
    
      function onSubmit(data: object){
        console.log('data', data)
        onSubmitProps(data)
        
      }
  return (
    <Dialog  maxWidth="md" onClose={handleClose} open={open}>
        <DialogTitle fontWeight={700} color="secondary.contrastText" >Connect with the existing database</DialogTitle>
        <DialogContent>
          <DialogContentText fontSize="14px" fontWeight={400} id="alert-dialog-slide-description">
          기존에 실행되고 있는 데이터베이스와 연결하기 위해 데이터베이스의 유형과 IP, Port를 입력해주세요.
          </DialogContentText>
          <Grid marginTop={4} container direction="column">
              <Typography marginBottom={2} color="info" fontSize="16px" fontFamily="Mulish" fontWeight={700} > Required</Typography>
              <Grid item container  direction="row">
                <Title color="info" >Database Type</Title>
                <Heading color="info.light" >Blazegraph</Heading>
              </Grid>
              <Grid item container alignItems="center" direction="row">
                <Title color="info">IP Address</Title>
                <ModalTextField 
                {...register('ipAddress',{
                    required: {
                      value: true,
                      message: 'ipAddress must be filled'
                    },
                  })} 
                  helperText={errors.ipAddress?.message}
                  error={!!errors.ipAddress?.message}
                    sx={{ flex: 1 }}
                />
              </Grid>
              <Grid item container alignItems="center" direction="row">
                <Title color="info" >Port</Title>
                <ModalTextField {...register('port',{
                    required: {
                      value: true,
                      message: 'Port must be filled'
                    },
                    valueAsNumber: true
                  })} helperText={errors.port?.message} error={!!errors.port?.message}  type="number" />
              </Grid>
          </Grid>
          <DialogActions sx={{ justifyContent: 'center' }} >
            <Button onClick={handleSubmit(onSubmit)} sx={{ width: '246px' }} variant="contained" color="blue">Connect Database</Button>
          </DialogActions>
        </DialogContent>
    </Dialog>
  )
}
