import './App.css'
import AppDrawer from './components/layouts/AppDrawer'
import Header from './components/layouts/Header'
import { Box, styled } from '@mui/material'
import { drawerWidth } from './components/layouts/AppDrawer'

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
      <AppDrawer/>
      <Main display="flex" justifyContent="flex-start" alignItems="stretch" flexDirection="column" sx={{ }}>
        <Header/>
      </Main>
    </>
  )
}

export default App
