import './App.css'
import AppDrawer from './components/layouts/AppDrawer'
import Header from './components/layouts/Header'
import { Box, styled } from '@mui/material'
import { drawerWidth } from './components/layouts/AppDrawer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const FileUpload = lazy(() => import('@/pages/FileUpload'))

const Main = styled(Box, { shouldForwardProp: prop => prop !== 'open' })(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: `calc(${drawerWidth})`,
    width: `calc(100vw - ${drawerWidth})`,
    minHeight: '100vh'
  })
);

function App() {
  return (
    <>
     
      <Main display="flex" justifyContent="flex-start" alignItems="stretch" flexDirection="column" sx={{ }}>
        <Header/>
        <Box paddingLeft="58px">
        <BrowserRouter>
          <AppDrawer/>
          <Suspense fallback={<div>Loading...</div>} >
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/file-upload" element={<FileUpload/>} />
            </Routes>
            </Suspense>
        </BrowserRouter>
        </Box>
       
      </Main>
    </>
  )
}

export default App
