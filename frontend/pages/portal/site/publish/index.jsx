// // Libraries
// import React, { useState, useEffect, useContext } from 'react';

// // Mine
// import tabsJson from '@/pages-scripts/portal/site/tabs.json';
// import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
// import AdminLayout from '@/layouts/admin/layout';

// // MUI
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import CircularProgress from '@mui/material/CircularProgress';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import SiteDesignerPublishProvider, { SiteDesignerPublishContext } from '@/pages-scripts/portal/site/publish/context/SiteDesignerPublish.context';
// import PublishModal from '@/pages-scripts/portal/site/publish/modals/publish.modal';
// import moment from 'moment';

// const PublishPage = () => {

//   const { setTabs } = useContext(AdminLayoutContext);
//   const {
//     isLoaded, setIsLoaded,
//     isNewPublishModalOpen, setIsNewPublishModalOpen,
//     publishRecords, setPublishRecords,
//     // utils
//     openPublishModal,
//     publishWebsite,
//   } = useContext(SiteDesignerPublishContext)


//   const [isPublishing, setIsPublishing] = useState(false);
//   const [publishHistory, setPublishHistory] = useState([]);

//   useEffect(() => {
//     setTabs((prevState) => ({
//       ...prevState,
//       tabs: tabsJson.tabs,
//       selectedValue: 2,
//     }));

//   }, [setTabs]);

//   const handlePublish = () => {
//     // Simulate an API call or publishing process
//     // setIsPublishing(true);
//     openPublishModal()
//   };

//   return (
//     <Box sx={{
//       flexGrow: 1,
//       width: "100%",
//       maxWidth: "900px",
//       m: "auto"
//     }}>
//       <>
//         {isLoaded && (
//           <>
//             <Paper elevation={3} sx={{ display: 'flex' }}>
//               {/* Publish Section */}
//               <Box sx={{ flexBasis: '30%', marginRight: '2%', padding: '20px' }}>
//                 <h2 style={{ marginBottom: '20px', textAlign: "center" }}>Publish</h2>
//                 <Stack spacing={2} direction="row" justifyContent="center">
//                   <Button
//                     variant="contained"
//                     color="success"
//                     onClick={handlePublish}
//                     disabled={isPublishing}
//                     sx={{ minWidth: '120px', fontWeight: 'bold' }}
//                   >
//                     {isPublishing ? (
//                       <CircularProgress size={24} color="inherit" />
//                     ) : (
//                       'Release'
//                     )}
//                   </Button>
//                 </Stack>
//                 <br />
//               </Box>

//               {/* Publish History Table */}
//               <Box sx={{ flexBasis: '68%' }}>
//                 <TableContainer component={Paper} sx={{
//                   borderTopLeftRadius: 0,
//                   borderBottomLeftRadius: 0,
//                   background: '#f8f8f8',
//                   height: "150px",
//                 }}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Date</TableCell>
//                         <TableCell>Number of Pages</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {publishRecords && (
//                         <>

//                           {publishRecords.map((entry, index) => (
//                             <TableRow key={index}>
//                               <TableCell>{moment(parseInt(entry.createdAt)).fromNow()}</TableCell>
//                               <TableCell>{entry.numberOfPages}</TableCell>
//                             </TableRow>
//                           ))}

//                           {publishRecords.length === 0 && (
//                             <TableRow>
//                               <TableCell
//                                 className='text-center'
//                                 colSpan={2}
//                               >
//                                 Nothing here.
//                               </TableCell>
//                             </TableRow>
//                           )}
//                         </>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Box>
//             </Paper>
//           </>
//         )}
//       </>
//       <PublishModal
//         isOpened={isNewPublishModalOpen}
//         onClose={() => {
//           setIsNewPublishModalOpen(false)
//         }}
//         onSubmit={() => {
//           publishWebsite()
//         }}
//       />
//     </Box>
//   );
// };

// PublishPage.getLayout = function getLayout(page) {
//   return (
//     <AdminLayout>
//       <SiteDesignerPublishProvider>
//         {page}
//       </SiteDesignerPublishProvider>
//     </AdminLayout>
//   )
// };

// export default PublishPage;














import React, { useState, useEffect, useContext } from 'react';
import { Box, Paper, Button, Stack, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SiteDesignerPublishProvider, { SiteDesignerPublishContext } from '@/pages-scripts/portal/site/publish/context/SiteDesignerPublish.context';
import PublishModal from '@/pages-scripts/portal/site/publish/modals/publish.modal';
import moment from 'moment';

const PublishPage = () => {
  const {
    // status circles
    CircleStatusSuccess,
    CircleStatusDanger,
    // tabs
    setTabs,
  } = useContext(AdminLayoutContext);

  const {
    isLoaded,
    isNewPublishModalOpen,
    publishRecords,
    openPublishModal,
    publishWebsite,
  } = useContext(SiteDesignerPublishContext);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    setTabs((prevState) => ({
      ...prevState,
      selectedValue: 2,
    }));
  }, [setTabs]);

  const handlePublish = () => {
    openPublishModal();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Dummy data for the list view in tabs
  const dummyData = [
    { id: 1, error: 'Error 1', pages: 2, config: 'Config A' },
    { id: 2, error: 'Error 2', pages: 5, config: 'Config B' },
    { id: 3, error: 'Error 3', pages: 1, config: 'Config C' },
  ];

  return (
    <Box sx={{ flexGrow: 1, width: "100%", maxWidth: "900px", m: "auto" }}>
      {isLoaded && (
        <>
          <Box elevation={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left side buttons */}
            <Stack spacing={2} direction="row">
              <Button variant="containedWhite">Validate</Button>
              <Button variant="containedWhite">Preview Site</Button>
            </Stack>
            {/* Right side publish button */}
            <Button variant="contained" color="success" onClick={handlePublish}>
              Publish
            </Button>
          </Box>

          <br />
          {/* Tabs Section */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="publish tabs"
            sx={{
              borderBottom: '1px solid #ddd',
              '& .MuiTab-root': {
                minWidth: 120, // Adjust as needed
              },
              '& .MuiTabs-indicator': {
                backgroundColor: (theme) => theme.palette.primary.main,
                height: '4px', // Adjust height as needed
              },
            }}
          >
            <Tab label={(
              <span>
                <CircleStatusDanger />
                &nbsp;Errors
              </span>
            )}
            />
            <Tab label={(
              <span>
                <CircleStatusSuccess />
                &nbsp;Pages
              </span>
            )}
            />
            <Tab label={(
              <span>
                <CircleStatusSuccess />
                &nbsp;Configurations
              </span>
            )} />
          </Tabs>

          {/* Tab content */}
          <Paper elevation={3}>
            {tabValue === 0 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Error</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyData.map((row, index) => (
                      <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#fff' }}>
                        <TableCell>{row.error}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {tabValue === 1 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Pages</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyData.map((row, index) => (
                      <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#fff' }}>
                        <TableCell>{row.pages}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {tabValue === 2 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Configurations</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyData.map((row, index) => (
                      <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#fff' }}>
                        <TableCell>{row.config}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </>
      )}

      <PublishModal
        isOpened={isNewPublishModalOpen}
        onClose={() => setIsNewPublishModalOpen(false)}
        onSubmit={() => publishWebsite()}
      />
    </Box>
  );
};

PublishPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <SiteDesignerPublishProvider>
        {page}
      </SiteDesignerPublishProvider>
    </AdminLayout>
  );
};

export default PublishPage;
