import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form'
import { Grid, Button } from '@mui/material';
import { Title, ModalTextField } from '@/components/common/modal';

export interface ConnectWithExistingDatabaseProps{
    handleClose: (value: boolean) => void;
    open: boolean;
    onSubmit: (data: CreateNewNamespaceRequest) => void
    loading: boolean
}

export interface CreateNewNamespaceRequest{
    name: string
}

export default function CreateNewNamespace({ loading = false, handleClose, open, onSubmit: onSubmitProps }: ConnectWithExistingDatabaseProps) {
    const methods = useForm<CreateNewNamespaceRequest>({
        mode: 'onBlur',
        defaultValues: { 
            name: ''
          },
      })
    
      const { register, formState: { errors }, handleSubmit } = methods
    
      function onSubmit(data: CreateNewNamespaceRequest){
        console.log('data', data)
        onSubmitProps(data)
        
      }
  return (
    <Dialog maxWidth="lg" onClose={handleClose} open={open}>
        <DialogTitle fontWeight={700} color="secondary.contrastText" >Create New Namespace</DialogTitle>
        <DialogContent>
          <Grid marginTop={4} container direction="column">
              <Grid item container alignItems="center" direction="row">
                <Title color="info">Name</Title>
                <ModalTextField 
                {...register('name',{
                    required: {
                      value: true,
                      message: 'Name must be filled'
                    },
                  })} 
                  disabled={loading}
                  helperText={errors.name?.message}
                  error={!!errors.name?.message}
                    sx={{ flex: 1 }}
                />
              </Grid>
          </Grid>
          <DialogActions sx={{ justifyContent: 'center' }} >
            <Button disabled={loading} onClick={handleSubmit(onSubmit)} sx={{ width: '246px' }} variant="contained" color="blue">Create</Button>
          </DialogActions>
        </DialogContent>
    </Dialog>
  )
}
