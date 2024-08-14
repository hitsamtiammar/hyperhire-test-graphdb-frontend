import { Grid, styled, Typography,  Button,  Box } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const ContainerGrid = styled(Grid)(() => ({
    // paddingRight: '28px',
    marginTop: '41px',
    paddingLeft: '58px',
    paddingRight: '40px',
    marginBottom: '48px'
}))

export default function Header() {
  return (
    <ContainerGrid container justifyContent="space-between" direction="row">
        <Grid item>
            <Typography fontFamily="Montserrat" fontWeight={700} fontSize="24px">설정</Typography>
        </Grid>
        <Grid item>
            <Box display="flex" flexDirection="row">
                <Button endIcon={<KeyboardArrowDownIcon />}>한국어</Button>
                <Box sx={{ width: '1px', marginX: '20px', backgroundColor: '#DFE0EB' }} />
                <Button autoCapitalize="" startIcon={<PermIdentityIcon/>}>
                    <Typography fontWeight={600} fontFamily="Mulish" fontSize="14px">Username</Typography>
                </Button>
            </Box>
         
        </Grid>
    </ContainerGrid>
  )
}
