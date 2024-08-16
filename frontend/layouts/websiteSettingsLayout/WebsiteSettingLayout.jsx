'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
// import AdminLayoutContext and other necessary imports
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import Header from '@/layouts/admin/layout/components/Header';
import WebsiteSettingLayoutContext from './WebsiteSettingLayout.context';
import MeetingPanel from '../admin/layout/components/MeetingPanel';
import useMediaQuery from '@mui/material/useMediaQuery';
import SettingHeader from './components/SettingHeader';

const drawerWidth = 400;

export default function InsideWebsiteSettingLayout({ SideMenu, children, ...props }) {
  const headerRef = React.useRef();
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md')); // Adjust this as per your needs
  const adminLayoutContext = React.useContext(AdminLayoutContext);
  const webSettingLayoutContext = React.useContext(WebsiteSettingLayoutContext);
  const [headerHeight, setHeaderHeight] = React.useState();

  React.useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef]);

  const handleDrawerToggle = () => {
    webSettingLayoutContext.setLeftDrawer(prevState => ({
      ...prevState,
      isOpened: !prevState.isOpened,
    }));
  };

  const onMeetingDrawerToggle = () => {
    adminLayoutContext.setRightDrawer(prevState => ({
      ...prevState,
      isOpened: !prevState.isOpened,
    }));
  };

  return (
    <>

      {isTabletOrMobile && (
        <SettingHeader
          isOpened={webSettingLayoutContext.leftDrawer.isOpened}
          onDrawerToggle={handleDrawerToggle}
          onMeetingDrawerToggle={onMeetingDrawerToggle}
          tabs={[]}
        />
      )}
      <Box sx={{
        display: 'flex',
        p: 0,
      }}>
        <CssBaseline />

        <Box
          component="nav"
          sx={{
            width: webSettingLayoutContext.leftDrawer.isOpened
              ? `${drawerWidth}`
              : `0`,
            flexShrink: { sm: 0 },
          }}
          aria-label="Page builder menu"
        >
          <Drawer
            sx={{
              width: drawerWidth,
              visibility: "visible",
              minHeight: "73px",
              top: "100px",
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                visibility: "visible",
                top: isTabletOrMobile ? "88px" : "0px",
              },
            }}
            variant="persistent"
            anchor="left"
            open={webSettingLayoutContext.leftDrawer.isOpened}
          >
            {SideMenu}
          </Drawer>
        </Box>

        <Box component="nav">
          <MeetingPanel
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={adminLayoutContext.rightDrawer.isOpened}
            onClose={onMeetingDrawerToggle}
            anchor="right"
          />
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            width: webSettingLayoutContext.leftDrawer.isOpened
              ? `calc(100vw - ${drawerWidth}px)`
              : `calc(100vw)`,
          }}
        >
          {/* Render vertical header for mobile/tablet */}
          {!isTabletOrMobile && (
            <div ref={headerRef}>
              <SettingHeader
                isOpened={webSettingLayoutContext.leftDrawer.isOpened}
                onDrawerToggle={handleDrawerToggle}
                onMeetingDrawerToggle={onMeetingDrawerToggle}
                tabs={[]}
              />
            </div>
          )}
          <main style={{
            height: `calc(-93px + 101vh)`,
            backgroundColor: theme.palette.grey[300],
            color: "black",
            overflow: "auto"
          }}>
            {children}
          </main>
        </Box>
      </Box>
    </>
  );
}
