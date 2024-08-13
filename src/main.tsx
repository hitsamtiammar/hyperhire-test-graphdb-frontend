import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@mui/material'
import theme from './theme'

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
)
