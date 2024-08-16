import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form'
import { Title, Heading, ModalTextField } from '@/components/common/modal';
import { CreateDbRequest } from '@/api';

export interface CreateNewDatabaseProps{
    handleClose: (value: boolean) => void,
    open: boolean;
    onSubmit: (data: CreateDbRequest) => void
}

const DEFAULT_URL_NEW_DATABASE = import.meta.env.VITE_DEFAULT_CREATE_DATABASE

export default function CreateNewDatabase({ handleClose, open, onSubmit: onSubmitProps }: CreateNewDatabaseProps) {
  const methods = useForm<CreateDbRequest>({
    mode: 'onBlur',
    defaultValues: { 
        port: 0,
        minimumUsage: 0,  
        maximumUsage: 0,
        url: DEFAULT_URL_NEW_DATABASE
      },
  })

  const { register, formState: { errors }, handleSubmit } = methods

  function onSubmit(data: CreateDbRequest){
    console.log('data', data)
    onSubmitProps(data)
  }

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
                <ModalTextField 
                {...register('port',{
                    required: {
                      value: true,
                      message: 'Port must be filled'
                    },
                    valueAsNumber: true
                  })} helperText={errors.port?.message} error={!!errors.port?.message}  type="number" />
              </Grid>
              <Grid item container alignItems="center" direction="row">
                <Title color="info" >Url</Title>
                <ModalTextField 
                {...register('url',{
                    required: {
                      value: true,
                      message: 'url must be filled'
                    },
                  })} helperText={errors.url?.message} error={!!errors.url?.message}  />
              </Grid>
          </Grid>
          <Grid marginTop={4} container direction="column">
              <Heading marginBottom={2} color="info">Optional</Heading>
              <Grid item container alignItems="center" direction="row">
                <Title color="info" sx={{ width: '40%' }}>Minimum Memory Usage(-Xms)</Title>
                <ModalTextField 
                {...register('minimumUsage',{
                  required: {
                    value: false,
                    message: 'Minimum Memory must be filled'
                  },
                  valueAsNumber: true
                })}
                helperText={errors.minimumUsage?.message}
                error={!!errors.minimumUsage?.message}
                type="number"  />
              </Grid>
              <Grid item container alignItems="center" direction="row">
                <Title color="info" sx={{ width: '40%' }}>Maximum Memory Usage(-Xmx)</Title>
                <ModalTextField 
                {...register('maximumUsage',{
                  required: {
                    value: false,
                    message: ''
                  },
                  valueAsNumber: true
                })}   
                helperText={errors.maximumUsage?.message}
                error={!!errors.maximumUsage?.message}           
                type="number" />
              </Grid>
          </Grid>
          <DialogActions sx={{ justifyContent: 'center' }} >
            <Button onClick={handleSubmit(onSubmit)} sx={{ width: '246px' }} variant="contained" color="blue">Create Database</Button>
          </DialogActions>
        </DialogContent>
    </Dialog>
  )
}
