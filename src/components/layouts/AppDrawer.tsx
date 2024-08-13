import styled from '@emotion/styled';
import { Toolbar, Box, Avatar, Typography, List, ListItem as ListItemMui, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import React from 'react'
import { FileUpload, Settings } from '@mui/icons-material'
import ArticleIcon from '@mui/icons-material/Article';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import LayersIcon from '@mui/icons-material/Layers';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

const ListItem = styled(ListItemMui)(() => ({
    height: 56,
  }))

const drawerWidth = 255;

const DRAWER_LIST = [
    {
      id: '1',
      text: '설정',
      Icon: Settings
    },
    {
      id: '2',
      text: '데이터 업로드',
      Icon: FileUpload
    },
    {
      id: '3',
      text: 'Namespace',
      Icon: ArticleIcon
    },
    {
      id: '4',
      text: 'SPARQL',
      Icon: LightbulbIcon
    },
    {
      id: '5',
      text: '설정',
      Icon: SignalCellularAltIcon
    },
    {
      id: '6',
      text: '그래프 탐색',
      Icon: ShareOutlinedIcon
    },
    {
      id: '7',
      text: '나의 프로세스',
      Icon: LayersIcon
    },
  ]

export default function AppDrawer() {
  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
     
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: 'primary.main',
        color: 'secondary.main'
      },
    }}
    variant="permanent"
    anchor="left"
  >
    <Toolbar sx={{ marginTop: '21px', marginBottom: '50px' }}>
      <Box alignItems="center" display="flex" flexDirection="row">
        <Avatar>A</Avatar>
        <Typography marginLeft="15px" fontSize="19px" color="secondary.main" fontWeight={700}>Hike Lab.</Typography>
      </Box>
    </Toolbar>
    <List>
      {DRAWER_LIST.map(item => {
        const Icon = item.Icon 
        return (
      <ListItem key={item.id} disablePadding>
        <ListItemButton >
            <ListItemIcon>
              <Icon color="secondary" />
            </ListItemIcon>
            <ListItemText sx={{ fontFamily: 'Mullish' }} primary={item.text} />
          </ListItemButton>
      </ListItem>
      )})}
    </List>
  </Drawer>
  )
}
