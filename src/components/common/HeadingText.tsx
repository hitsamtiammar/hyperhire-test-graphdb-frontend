import { Box, IconButton, Typography, BoxProps } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export interface HeadingTextProps extends BoxProps{
    text: string;
    onPlusClick?: () => void
}

export default function HeadingText({text, onPlusClick = () => null, ...props} : HeadingTextProps) {
  return (
    <Box display="flex" alignItems="center" flexDirection="row"  {...props}>
        <Typography fontFamily="Montserrat"fontSize="20px" fontWeight={600}>{text}</Typography>
        <IconButton onClick={onPlusClick} color="warning" >
            <AddCircleOutlineRoundedIcon />
        </IconButton>
    </Box>
  )
}
