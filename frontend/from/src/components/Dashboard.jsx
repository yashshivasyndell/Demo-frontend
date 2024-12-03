import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

 const Dashboard = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>Users</Item>
        <Item>games</Item>
        <Item>High score</Item>
      </Stack>
    </Box>
  )
}
export default Dashboard