// Layout.js
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Outlet from './Outlet';

export const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection:{sm:'column',lg:'row'},gap: 2,
    padding: 3 }}>
      <Sidebar/>
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Outlet/>
      </Box>
    </Box>
  );
};

