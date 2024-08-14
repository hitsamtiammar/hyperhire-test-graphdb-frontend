import { Box, Grid, Paper, Typography, styled } from '@mui/material'
import HeadingText from '@/components/common/HeadingText';
import CreateNewDatabaseDialog from '@/dialog/CreateNewDatabaseDialog';
import { useState } from 'react';

const InfoBox = styled(Paper)(() => ({
    marginTop: '40px', minHeight: '189px', marginRight: '48px',
    padding: '19px 24px'
}))

export default function Home() {
    const [openCreate, setOpenCreate] = useState(false)
  return (
    <Grid container direction="column">
        <Box display="flex" alignItems="center" flexDirection="row">
            <HeadingText onPlusClick={() => setOpenCreate(true)} text="Active Database Information" />
        </Box>
        <InfoBox elevation={1}>
            <Typography>이 관리도구와 연결된 데이터베이스가 없습니다.</Typography>
            <Typography>위의 버튼을 눌러 새 데이터베이스를 생성하거나, 기존의 데이터베이스와 연결하세요.</Typography>
        </InfoBox>
        <HeadingText marginTop="43px" text="Repository" />
        <CreateNewDatabaseDialog open={openCreate} handleClose={() => setOpenCreate(false)} />
    </Grid>
  )
}
