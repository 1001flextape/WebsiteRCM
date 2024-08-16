import React, { useContext, useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/layout';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar, Badge, Chip, Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme } from '@mui/material';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import TimelineComponent from '@/pages-scripts/portal/dashboard/index/components/timeline';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { DashboardProvider } from '@/pages-scripts/portal/dashboard/index/context/Dashboard.context';
import { getDashboardGraphQL } from '@/pages-scripts/portal/dashboard/index/store/getDashboard.store';

function CircularProgressWithLabel(props) {

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  mixWidth: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function DashboardPage() {
  const theme = useTheme()

  // gui
  const [isLoaded, setIsLoaded] = useState(false)

  // data
  const [name, setName] = useState();
  const [color, setColor] = useState();
  const [startedAt, setStartedAt] = useState();
  const [getConfigurationChangedCount, setConfigurationChangedCount] = useState();
  const [getConfigurationNotReadyCount, setConfigurationNotReadyCount] = useState();
  const [getConfigurationProgress, setConfigurationProgress] = useState();
  const [getDraftedPagesDeletedCount, setDraftedPagesDeletedCount] = useState();
  const [getDraftedPagesNewCount, setDraftedPagesNewCount] = useState();
  const [getDraftedPagesTotalCount, setDraftedPagesTotalCount] = useState();
  const [getNewPagesDeletedCount, setNewPagesDeletedCount] = useState();
  const [getNewPagesNewCount, setNewPagesNewCount] = useState();
  const [getNewPagesNotReadyCount, setNewPagesNotReadyCount] = useState();
  const [getNewPagesProgress, setNewPagesProgress] = useState();
  const [getNewPagesTotalCount, setNewPagesTotalCount] = useState();
  const [getPublishedPagesChangedCount, setPublishedPagesChangedCount] = useState();
  const [getPublishedPagesDeletedCount, setPublishedPagesDeletedCount] = useState();
  const [getPublishedPagesNotReadyCount, setPublishedPagesNotReadyCount] = useState();
  const [getPublishedPagesProgress, setPublishedPagesProgress] = useState();
  const [getPublishedPagesTotalCount, setPublishedPagesTotalCount] = useState();

  const { navigate, setTabs } = useContext(AdminLayoutContext)

  useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: [],
    }))
  }, [])

  useEffect(() => {
    getDashboardGraphQL().then(response => {
      const data = response.data.backendProject_getCurrentSummary

      console.log('getConfigurationChangedCount', getConfigurationChangedCount)
      setName(data.name);
      setColor(data.color);
      setStartedAt(data.startedAt);
      setConfigurationChangedCount(data.getConfigurationChangedCount);
      setConfigurationNotReadyCount(data.getConfigurationNotReadyCount);
      setConfigurationProgress(data.getConfigurationProgress);
      setDraftedPagesDeletedCount(data.getDraftedPagesDeletedCount);
      setDraftedPagesNewCount(data.getDraftedPagesNewCount);
      setDraftedPagesTotalCount(data.getDraftedPagesTotalCount);
      setNewPagesDeletedCount(data.getNewPagesDeletedCount);
      setNewPagesNewCount(data.getNewPagesNewCount);
      setNewPagesNotReadyCount(data.getNewPagesNotReadyCount);
      setNewPagesProgress(data.getNewPagesProgress);
      setNewPagesTotalCount(data.getNewPagesTotalCount);
      setPublishedPagesChangedCount(data.getPublishedPagesChangedCount);
      setPublishedPagesDeletedCount(data.getPublishedPagesDeletedCount);
      setPublishedPagesNotReadyCount(data.getPublishedPagesNotReadyCount);
      setPublishedPagesProgress(data.getPublishedPagesProgress);
      setPublishedPagesTotalCount(data.getPublishedPagesTotalCount);
      setIsLoaded(true)
    })

  }, [])

  return (
    <>
      {isLoaded && (
        <>
          <Box sx={{
            flexGrow: 1,
            width: '100%',
            maxWidth: '900px',
            m: 'auto',
          }}>
            {/* Project Name */}
            <Box sx={{ m: 1 }}>
              <List sx={{ p: 0 }}>
                <HeaderRow label='Project Name' />
              </List>
              <Paper elevation={3}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: "0 0 5px 5px",
                }}>
                <div>

                  <Box
                    sx={{
                      width: '18px', // Adjust the width of the colored box
                      height: '18px',
                      border: "3px solid rgb(66, 66, 66)",
                      backgroundColor: `${color || "#f0a012"}`, // Change the background color
                      borderRadius: '0', // Adjust the border radius
                      marginRight: '16px', // Adjust the spacing between the box and text
                      display: "inline-block",
                    }}
                  />
                  <Typography variant="h5" sx={{ display: "inline-block" }}>{name}</Typography>
                </div>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Paper>
            </Box>

            {/* Row of Tiles */}
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap', // Allow wrapping
              justifyContent: 'center', // Center the content
              gap: 2, // Add some spacing between tiles
              '& > *': { flexBasis: '100%' }, // Full width for mobile (default)
              '@media (min-width: 600px)': { // Tablet view
                '& > *': { flexBasis: 'calc(48% - 20px)' }, // Two tiles in one row
              },
              '@media (min-width: 960px)': { // Laptop view
                '& > *': { flexBasis: 'calc(23% - 16px)' }, // Four tiles in one row
              },
            }}>

              {/* New Pages */}
              <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
                <List sx={{ p: 0 }}>
                  <HeaderRow label='New Pages' />
                  <ListItem>
                    <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton onClick={() => navigate("/portal/dashboard/new-pages/ready")}>

                        <CircularProgressWithLabel variant="determinate" value={getNewPagesProgress} color="error" />
                      </IconButton>
                    </Box>

                    <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                      <IconButton onClick={() => navigate("/portal/dashboard/new-pages/total")}>

                        <Badge
                          badgeContent={"total"} sx={{
                            '& .MuiBadge-badge': {
                              right: "-50%",
                              top: 16,
                            }
                          }}>
                          <Avatar
                          // sx={{ bgcolor: deepOrange[500] }}

                          >
                            {getNewPagesTotalCount}
                          </Avatar>
                        </Badge>
                      </IconButton>

                    </Box>


                  </ListItem>

                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/new-pages/new")}>
                    <ListItem >

                      <ListItemIcon>
                        <SmallAvatar variant="square" sx={{
                          background: theme.palette.success.main,
                          color: theme.palette.success.contrastText,
                        }}>
                          {getNewPagesNewCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="New" />
                    </ListItem>
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/new-pages/not-ready")}>
                    <ListItem >

                      <ListItemIcon>
                        <SmallAvatar variant="square" sx={{
                          background: theme.palette.error.main,
                          color: theme.palette.error.contrastText,
                        }}>
                          {getNewPagesNotReadyCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="Not Ready" />

                    </ListItem>
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/new-pages/deleted")}>
                    <ListItem >
                      <ListItemIcon>
                        <SmallAvatar variant="square" sx={{
                          background: theme.palette.info.main,
                          color: theme.palette.info.contrastText,
                        }}>
                          {getNewPagesDeletedCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="Deleted" />
                    </ListItem>
                  </ListItemButton>
                  <Divider />

                </List>
              </Paper>

              {/* Published Pages */}
              <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
                <List sx={{ p: 0 }}>
                  <HeaderRow label='Published Pages' />
                  <ListItem>
                    <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton onClick={() => navigate("/portal/dashboard/published-pages/ready")}>

                        <CircularProgressWithLabel variant="determinate" value={getPublishedPagesProgress} color="error" />
                      </IconButton>
                    </Box>

                    <Box sx={{ width: "50%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                      <IconButton onClick={() => navigate("/portal/dashboard/published-pages/total")}>

                        <Badge
                          badgeContent={"total"} sx={{
                            '& .MuiBadge-badge': {
                              right: "-50%",
                              top: 16,
                            }
                          }}>
                          <Avatar
                          // sx={{ bgcolor: deepOrange[500] }}

                          >
                            {getPublishedPagesTotalCount}
                          </Avatar>
                        </Badge>
                      </IconButton>

                    </Box>


                  </ListItem>

                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/published-pages/changed")}>
                    <ListItem >

                      <ListItemIcon>
                        <SmallAvatar variant="square" sx={{
                          background: theme.palette.success.main,
                          color: theme.palette.success.contrastText,
                        }}>
                          {getPublishedPagesChangedCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="Changed" />
                    </ListItem>
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/published-pages/not-ready")}>
                    <ListItem >

                      <ListItemIcon>
                        <SmallAvatar variant="square" sx={{
                          background: theme.palette.error.main,
                          color: theme.palette.error.contrastText,
                        }}>
                          {getPublishedPagesNotReadyCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="Not Ready" />
                    </ListItem>
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/published-pages/deleted")}>
                    <ListItem >

                      <ListItemIcon>
                        <SmallAvatar variant="square" sx={{
                          background: theme.palette.info.main,
                          color: theme.palette.info.contrastText,
                        }}>
                          {getPublishedPagesDeletedCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="Deleted" />

                    </ListItem>
                  </ListItemButton>
                  <Divider />





                </List>
              </Paper>

              {/* Configuration Status */}
              <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
                <List sx={{ p: 0 }}>
                  <HeaderRow label='Configuration Status' />
                </List>
                <Box
                  sx={{
                    p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <IconButton onClick={() => navigate("/portal/dashboard/configuration-status/ready")}>
                    <CircularProgressWithLabel variant="determinate" value={getConfigurationProgress} color="error" />
                  </IconButton>
                </Box>
                <List sx={{ p: 0 }}>
                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/configuration-status/changed")}>
                    <ListItem >

                      <ListItemIcon>
                        <SmallAvatar variant="square" sx={{
                          background: theme.palette.success.main,
                          color: theme.palette.success.contrastText,
                        }}>
                          {getConfigurationChangedCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="Changed" />
                    </ListItem>
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/configuration-status/not-ready")}>
                    <ListItem >
                      <ListItemIcon>
                        <SmallAvatar variant="square" sx={{
                          background: theme.palette.error.main,
                          color: theme.palette.error.contrastText,
                        }}>
                          {getConfigurationNotReadyCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="Not Ready" />
                    </ListItem>
                  </ListItemButton>
                  <Divider />



                </List>
              </Paper>

              {/* Drafted Pages */}
              <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
                <List sx={{ p: 0 }}>
                  <HeaderRow label='Drafted Pages' />
                </List>
                <Box
                  sx={{
                    p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}
                >

                  <IconButton
                    sx={{ m: "4px 0" }}
                    onClick={() => navigate("/portal/dashboard/drafted-pages/total")}>

                    <Badge
                      badgeContent={"total"} sx={{
                        '& .MuiBadge-badge': {
                          right: "-50%",
                          top: 16,
                        }
                      }}>
                      <Avatar
                      // sx={{ bgcolor: deepOrange[500] }}

                      >
                        {getDraftedPagesTotalCount}
                      </Avatar>
                    </Badge>
                  </IconButton>
                </Box>
                <List sx={{ p: 0 }}>

                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/drafted-pages/new")}>
                    <ListItem >

                      <ListItemIcon>
                        <SmallAvatar variant="square">
                          {getDraftedPagesNewCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="New" />

                    </ListItem>
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => navigate("/portal/dashboard/drafted-pages/deleted")}>
                    <ListItem >

                      <ListItemIcon>
                        <SmallAvatar variant="square">
                          {getDraftedPagesDeletedCount}
                        </SmallAvatar>
                      </ListItemIcon>
                      <ListItemText primary="Deleted" />

                    </ListItem>
                  </ListItemButton>
                  <Divider />
                </List>
              </Paper>

            </Box>
            <br />

            <Paper elevation={3} sx={{ flex: 1, m: 1 }}>
              <TimelineComponent />
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}

DashboardPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      <DashboardProvider>
        {page}
      </DashboardProvider>
    </AdminLayout>
  );
}

export default DashboardPage;
