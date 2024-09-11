import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import DragIndicator from '@mui/icons-material/DragIndicator';
import { Link, useTheme } from '@mui/material';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { realtimeLink } from '@/utils/realtime/link';
import { useRouter } from 'next/router';
import { SiteDesignerPageContext } from '../context/SiteDesignerPage.context';

function PageList({ sections }) {
  const router = useRouter();
  const theme = useTheme();
  const { navigate } = useContext(AdminLayoutContext);
  const { setNormalSectionDeleteModal } = useContext(SiteDesignerPageContext);

  const [pages, setPages] = useState(sections || []);
  useEffect(() => {
    setPages(sections)
  }, [sections])
  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, pageId) => {
    setAnchorEl((prev) => ({ ...prev, [pageId]: event.currentTarget }));
  };

  const handleClose = (pageId) => {
    setAnchorEl((prev) => ({ ...prev, [pageId]: null }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reordered = Array.from(pages);
    const [movedPage] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, movedPage);

    setPages(reordered);
  };

  const handleDeleteNormalModal = (page) => {
    setNormalSectionDeleteModal((prevState) => ({
      ...prevState,
      isOpened: true,
      id: page.id,
      name: page.name,
      author: page.author,
    }));
    handleClose(page.id);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="pageList">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {pages.map((page, index) => (
              <Draggable key={page.id} draggableId={page.id} index={index}>
                {(draggableProvided) => (
                  <ListItem
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    style={{
                      ...draggableProvided.draggableProps.style,
                      borderBottom: '1px solid #e0e0e0',
                    }}
                  >
                    <IconButton {...draggableProvided.dragHandleProps}>
                      <DragIndicator />
                    </IconButton>
                    <Link
                      style={{
                        cursor: 'pointer',
                        paddingLeft: '5px',
                      }}
                      onClick={() => {
                        navigate(`/portal/site/pages/${router.query.pageId}/section/${page.id}`)
                      }}
                    >
                      {page.name}
                      <br />
                      <small
                        style={{
                          color: theme.palette.grey[800],
                          textDecoration: 'none',
                        }}
                      >
                        {page.author}
                      </small>
                    </Link>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={(e) => handleClick(e, page.id)}>
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl[page.id]}
                        keepMounted
                        open={Boolean(anchorEl[page.id])}
                        onClose={() => handleClose(page.id)}
                      >
                        <MenuItem
                          onClick={() => {
                            navigate(`/portal/site/pages/${router.query.pageId}/section/${page.id}`);
                            handleClose(page.id);
                          }}
                        >
                          <Edit fontSize="small" />
                          &nbsp; Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteNormalModal(page)}>
                          <Delete fontSize="small" />
                          &nbsp; Delete
                        </MenuItem>
                      </Menu>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default PageList;
