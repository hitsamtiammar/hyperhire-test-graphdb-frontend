import { styled, TextField, Typography } from "@mui/material";

export const Title = styled(Typography)({
    fontSize: '16px',
    width: '20%',
    fontFamily: 'Mulish',
    fontWeight: 500
});
  
export const Heading = styled(Typography)({
    fontSize: '16px',
    fontFamily:"Mulish",
    fontWeight: 700
  })
  
export const ModalTextField = styled(TextField)(({ theme }) => ({ 
    marginBottom: '10px', 
    borderWidth: '1px', 
    borderColor: theme.palette.secondary.main 
}))