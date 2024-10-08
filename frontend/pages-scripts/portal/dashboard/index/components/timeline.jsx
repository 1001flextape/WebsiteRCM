import { Box, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import Timeline, { DateHeader, SidebarHeader, TimelineHeaders } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import TimelineModal from '../modal/Timeline.modal';
import { DashboardContext } from '../context/Dashboard.context';
import useMediaQuery from '@mui/material/useMediaQuery';

const TimelineComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's mobile

  const { isModalOpened, setIsModelOpened } = useContext(DashboardContext);

  // Placeholder data for the timeline
  const items = [
    { id: 1, group: 1, title: 'Rome', start_time: new Date(2024, 0, 1), end_time: new Date(2024, 0, 5) },
    { id: 2, group: 2, title: 'Ready/Not Ready', start_time: new Date(2024, 0, 3), end_time: new Date(2024, 0, 7) },
  ];

  const groups = [
    { id: 1, title: 'Projects' },
    { id: 2, title: 'Ready/Not Ready' },
  ];

  return (
    <>
      <Box
        sx={{
          overflowX: 'auto', // Enable horizontal scroll
          whiteSpace: 'nowrap',
          width: '100%', // Ensure it takes up the full width
        }}
      >
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={new Date(2024, 0, 1)}
          defaultTimeEnd={new Date(2024, 0, 31)}
          // sidebarWidth={isMobile ? 70 : 150} // Adjust the sidebar width for mobile
          lineHeight={isMobile ? 40 : 60} // Adjust line height for mobile
          canMove={false}
          canResize={false}
          canChangeGroup={false}
          style={{ width: 'calc(100vw - 48px)' }}
        >
          <TimelineHeaders calendarHeaderStyle={{ background: 'rgb(66, 66, 66)', color: '#fff' }}>
            <SidebarHeader>
              {({ getRootProps }) => {
                return (
                  <div {...getRootProps()}>
                    <Box sx={{ p: '3px', color: theme.palette.grey[200] }}>
                      <p
                        style={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setIsModelOpened(true);
                        }}
                      >
                        <small>View all Projects</small>
                      </p>
                    </Box>
                  </div>
                );
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" style={{ color: 'rgb(66, 66, 66)' }} />
            <DateHeader style={{ color: 'rgb(66, 66, 66)' }} />
          </TimelineHeaders>
        </Timeline>
      </Box>
      <TimelineModal
        isOpened={isModalOpened}
        onClose={() => {
          setIsModelOpened(false);
        }}
      />
    </>
  );
};

export default TimelineComponent;
