// Layout.js
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Outlet from './Outlet';

export const Layout = () => {
  return (
    <Box sx={{ display: 'flex',
      height:'100vh',
      overflow:'hidden',
    }}>
      
      <Box sx={{width:'100px',
        
      }}>
        <Sidebar/>
      </Box>
      <Box
        component="main"
        sx={{
          overflowY: 'auto',
          width:'80vw',
          marginLeft:'140px',
          height: '100vh'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

