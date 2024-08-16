// libraries
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

// mui
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import { Badge, useTheme } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import NotificationButton from '@/layouts/admin/layout/components/Header/NotificationButton.component';
import WithAvatarGroup from '@/layouts/admin/layout/components/Header/WithTotalAvatars.component';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { realtimeLink } from '@/utils/realtime/link';

function SettingHeader(props) {
  const router = useRouter();
  const theme = useTheme();

  const { onDrawerToggle, onMeetingDrawerToggle } = props;
  const { tabs, setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext);

  const changeUrl = (href) => {
    realtimeLink({
      to: href,
      leaderUserId: panelMeetingDoc.leader?.id,
      meetingId: panelMeetingDoc.id,
      router,
      userId: idChip.id,
      setPanelMeetingDoc,
    });
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', p: 0, pl: "0 !important" }}>
          <Grid container alignItems="center" sx={{ width: '100%' }}>
            {/* Left side */}
            <Grid item sx={{ width: 60, backgroundColor: "#154D6C", height: '87px', display: 'flex', alignItems: 'center', paddingTop: "10px", paddingBottom: props.tabs.length === 0 ? "10px" : 0 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
                sx={{
                  color: theme.palette.common.white,
                  width: '100%',
                  height: '100%',
                  // '&:hover': {
                  //   backgroundColor: "darkblue",
                  // }
                }}
              >
                <MenuIcon fontSize="large" sx={{ml: "20px"}} />
              </IconButton>
            </Grid>

            {/* Right side */}
            <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: "10px", paddingBottom: props.tabs.length === 0 ? "10px" : 0 }}>
              <Tooltip title="Who is on the page">
                <IconButton
                  color="inherit"
                  aria-label="who is on page"
                  edge="start"
                  style={{
                    borderRadius: "5px",
                  }}
                >
                  <WithAvatarGroup max={4} />
                </IconButton>
              </Tooltip>

              <NotificationButton />
              <Tooltip title="Meetings">
                <IconButton
                  variant="contained"
                  aria-label="meeting panel"
                  onClick={onMeetingDrawerToggle}
                  edge="start"
                  sx={{
                    my: 1,
                    color: "#fff"
                  }}
                >
                  {panelMeetingDoc.id && (
                    <Badge badgeContent={"LIVE"} color="error" sx={{
                      '& .MuiBadge-badge': {
                        right: -3,
                        top: -10,
                      }
                    }}>
                      <GroupIcon fontSize="large" />
                    </Badge>
                  )}
                  {!panelMeetingDoc.id && (
                    <GroupIcon fontSize="large" />
                  )}
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {tabs?.tabs && tabs.tabs.length > 0 && (
        <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
          <div style={{ maxWidth: 936, margin: 'auto', width: "100%" }}>
            <Tabs value={tabs.selectedValue} textColor="inherit">
              {tabs.tabs.map(({ id, link, name }, index) => (
                <Link onClick={(() => changeUrl(link))} key={id || index}
                  sx={{ color: theme.palette.primary.contrastText }}>
                  <Tab
                    index={0}
                    label={name}
                    value={id}
                  />
                </Link>
              ))}
            </Tabs>
          </div>
        </AppBar>
      )}
    </React.Fragment>
  );
}

SettingHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default SettingHeader;
