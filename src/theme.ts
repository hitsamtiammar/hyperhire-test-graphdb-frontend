import { createTheme } from "@mui/material"
import './theme-module'

export default createTheme({
    typography: {
        button: {
          textTransform: 'none'
        }
      },
    palette: {
        primary: {
            main: '#363740'
        },
        secondary: {
            main: '#A4A6B3',
            contrastText: '#373F41'
        },
        info: {
            main: '#25282B'
        },
        warning: {
            main: '#737B7D'
        },
        gray: {
            main: '#737B7D'
        },
        description: {
            main: '#3A3A49'
        },
        blue: {
            main: '#007EFF',
            contrastText: 'white'
        }
    }
})