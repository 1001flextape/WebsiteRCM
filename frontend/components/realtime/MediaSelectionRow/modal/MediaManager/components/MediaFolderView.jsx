import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { SelectMediaManagerContext } from '../context/selectMediaManager.context';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import { getMediaManagerModelGraphQL } from '../store/getMedia.store';
import NewFolderSelectionModal from '../modals/NewFolderSelectionModal.modal';
import DeleteFolderFailedSelectionModal from '../modals/DeleteFolderFailedSelectionModal.modal';
import DeleteFolderSelectionModal from '../modals/DeleteFolderSelectionModal.modal';
import DeleteFileSelectionModal from '../modals/DeleteFileSelectionModal.modal';
import MoveFileSelectionModal from '../modals/MoveFileSelectionModal.modal';
import RenameFileSelectionModal from '../modals/RenameFileSelectionModal.modal';
import RenameFolderSelectionModal from '../modals/RenameFolderSelectionModal.modal';
import { ListItemButton } from '@mui/material';
import uploaderUtil from '@/utils/uploader/callUploaderApi';
import { getMediaManagerPageGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getPage.store';
import FileUploadIcon from '@mui/icons-material/FileUpload';


const menuItem = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(224, 224, 224)"
  }
}

const menuItemSelected = {
  backgroundColor: "rgb(224, 224, 224)"
}

const MediaFolderView = () => {
  const router = useRouter()
  const {
    mediaManager, setMediaManager,
    selectedImage, setSelectedImage,
    selectImage,
    selectFolder,

    //functions:
    changeFileExplorerFolder,

  } = useContext(SelectMediaManagerContext)

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState({});
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    //:folderId, :callBack
    selectFolder({
      folderId: null,
      cb: () => {
        setIsLoaded(true)
      },
    })
  }, [])

  const handleFileUpload = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Handle file upload logic here
        console.log('Selected file:', file);


        uploaderUtil.postMediaManager({
          file,
          folderId: mediaManager.explorerFolderId,
        }).then(() => {

          getMediaManagerPageGraphQL({
            folderId: mediaManager.explorerFolderId,
          }).then(result => {
            const foldersFromServer = result.data.backendMediaManagerFolder_getMany
            const filesFromServer = result.data.backendMediaManagerFile_getMany

            setMediaManager(prevState => ({
              ...prevState,
              files: filesFromServer,
              folders: foldersFromServer
            }))
          })
        })
      }
    }
    inputElement.click(); // This opens the system's file explorer
    handleClose();
  };

  const handleImageSelection = ({ imageId }) => {
    selectImage({ imageId });
  }

  const handleFolderSelection = ({ folderId }) => {
    selectFolder({ folderId });
  }

  // Menu handling
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event, itemId) => {
    event.stopPropagation(); // Prevents the ListItem click
    setMenuAnchorEl(prevState => ({
      ...prevState,
      [itemId]: event.currentTarget
    }));
  };

  const handleMenuClose = () => {
    setMenuAnchorEl({});
  };

  const handleNewFolder = () => {
    // Handle New Folder

    setMediaManager(prevState => ({
      ...prevState,
      modal_isNewFolderModalOpened: true,
    }))

    handleClose();
  };

  const handleOpen = (folderId) => {
    // Handle Open Folder
    handleMenuClose();
  };

  const handleRename = (folderId, folderName) => {
    setMediaManager(prevState => ({
      ...prevState,
      modal_isRenameFolderModalOpened: true,
      selectedFolderId: folderId,
      selectFolderName: folderName,
    }))
    handleMenuClose();
  };

  const handleFolderDelete = (folderId, folderName) => {
    setMediaManager(prevState => ({
      ...prevState,
      modal_isDeleteFolderModalOpened: true,
      selectedFolderId: folderId,
      selectFolderName: folderName,
    }))
    // Handle Delete (Folder or File)
    handleMenuClose();
  };

  const handleFileSelect = (fileId) => {
    // Handle Select File
    console.log(`Selected file ID: ${fileId}`);
    handleImageSelection({
      imageId: fileId,
    })
    handleMenuClose();
  };

  const handleFileRename = (fileId, fileName) => {
    setMediaManager(prevState => ({
      ...prevState,
      modal_isRenameFileModalOpened: true,
      selectedFileId: fileId,
      selectFileName: fileName,
    }))
    handleMenuClose();
  };

  const handleMoveFile = (fileId, fileName) => {
    setMediaManager(prevState => ({
      ...prevState,
      modal_isMoveFileModalOpened: true,
      selectedFileId: fileId,
      selectFileName: fileName,
    }))

    handleMenuClose();
  };

  const handleFileDelete = (fileId, fileName) => {
    // Handle Delete File
    console.log(`Deleting file ID: ${fileId}`);
    setMediaManager(prevState => ({
      ...prevState,
      modal_isDeleteFileModalOpened: true,
      selectedFileId: fileId,
      selectFileName: fileName,
    }))

    handleMenuClose();
  };

  return (
    <>
      <Box sx={{
        flexGrow: 1,
        width: "100%",
        maxWidth: "900px",
        m: "auto",
        padding: "20px",
      }}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={11}>
            {isLoaded && (
              <>
                {mediaManager.breadCrumbs.length === 0 && (
                  <Breadcrumbs aria-label="breadcrumb">
                    <Typography
                      sx={{ lineHeight: "50px", cursor: "pointer" }}
                      color="text.primary"
                    >
                      Media Manager
                    </Typography>
                  </Breadcrumbs>
                )}

                {mediaManager.breadCrumbs.length !== 0 && (
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link
                      sx={{ lineHeight: "50px", cursor: "pointer" }}
                      underline="hover"
                      color="inherit"
                      onClick={() => handleFolderSelection({ folderId: null })}
                    >
                      Media Manager
                    </Link>
                    {mediaManager.breadCrumbs.map(b => (
                      <Link
                        key={b.id}
                        sx={{ lineHeight: "50px", cursor: "pointer" }}
                        underline="hover"
                        color="inherit"
                        onClick={() => handleFolderSelection({ folderId: b.id })}
                      >
                        {b.name}
                      </Link>
                    ))}
                  </Breadcrumbs>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={1} display="flex" justifyContent="flex-end">
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                style: {
                  marginTop: 8, // Adjust margin if needed to ensure menu is below the button
                },
              }}
            >
              <MenuItem onClick={handleFileUpload}>
              <FileUploadIcon sx={{mr: "10px"}} />
                Upload File
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleNewFolder}>
                <FolderIcon sx={{mr: "10px"}} />
                New Folder
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{
        flexGrow: 1,
        width: "100%",
        maxWidth: "900px",
        m: "auto",
        minHeight: "350px",
      }}>
        <Paper elevation={3} sx={{ borderRadius: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {isLoaded && mediaManager.folders.length === 0 && mediaManager.files.length === 0 && (
                <p style={{ textAlign: "center" }}>
                  <br /><em>Nothing here</em><br /><br />
                </p>
              )}
              {isLoaded && (
                <List dense={false}>
                  {mediaManager.folders.map(f => (
                    <div key={f.id}>
                      <ListItemButton
                        sx={{ menuItem }}
                        onClick={() => handleFolderSelection({ folderId: f.id })}
                      >
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={f.name} />
                        <IconButton
                          edge="end"
                          onClick={(event) => handleMenuClick(event, f.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={menuAnchorEl[f.id] || null}
                          open={Boolean(menuAnchorEl[f.id])}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          PaperProps={{
                            style: {
                              marginTop: 8,
                            },
                          }}
                          onClick={(event) => event.stopPropagation()} // Prevents menu click from triggering ListItem click
                        >
                          <MenuItem onClick={(event) => { event.stopPropagation(); handleOpen(f.id); }}>Open</MenuItem>
                          <MenuItem onClick={(event) => { event.stopPropagation(); handleRename(f.id, f.name); }}>Rename</MenuItem>
                          <MenuItem onClick={(event) => { event.stopPropagation(); handleFolderDelete(f.id, f.name); }}>Delete</MenuItem>
                        </Menu>
                      </ListItemButton>
                    </div>
                  ))}
                  {mediaManager.files.map(f => (
                    <div key={f.id}>
                      <ListItemButton
                        sx={{ menuItem }}
                        onClick={() => handleFileSelect(f.id)}
                      >
                        <ListItemIcon>
                          <ImageIcon />
                        </ListItemIcon>
                        <ListItemText primary={f.userFileName} />
                        <IconButton
                          edge="end"
                          onClick={(event) => handleMenuClick(event, f.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={menuAnchorEl[f.id] || null}
                          open={Boolean(menuAnchorEl[f.id])}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          PaperProps={{
                            style: {
                              marginTop: 8,
                            },
                          }}
                          onClick={(event) => event.stopPropagation()} // Prevents menu click from triggering ListItem click
                        >
                          <MenuItem onClick={(event) => { event.stopPropagation(); handleFileSelect(f.id); }}>Select</MenuItem>
                          <MenuItem onClick={(event) => { event.stopPropagation(); handleFileRename(f.id, f.userFileName); }}>Rename</MenuItem>
                          <MenuItem onClick={(event) => { event.stopPropagation(); handleMoveFile(f.id, f.userFileName); }}>Move</MenuItem>
                          <MenuItem onClick={(event) => { event.stopPropagation(); handleFileDelete(f.id, f.userFileName); }}>Delete</MenuItem>
                        </Menu>
                      </ListItemButton>
                    </div>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>
        </Paper>
        {isLoaded && (
          <>
            <DeleteFileSelectionModal
              isOpened={mediaManager.modal_isDeleteFileModalOpened}
              onClose={() => {
                setMediaManager(prevState => ({
                  ...prevState,
                  modal_isDeleteFileModalOpened: false,
                }))
              }}
            />

            <DeleteFolderFailedSelectionModal
              isOpened={mediaManager.modal_isDeleteFolderFailedModalOpened}
              onClose={() => {
                setMediaManager(prevState => ({
                  ...prevState,
                  modal_isDeleteFolderFailedModalOpened: false,
                }))
              }}
            />

            <DeleteFolderSelectionModal
              isOpened={mediaManager.modal_isDeleteFolderModalOpened}
              onClose={() => {
                setMediaManager(prevState => ({
                  ...prevState,
                  modal_isDeleteFolderModalOpened: false,
                }))
              }}
            />

            <MoveFileSelectionModal
              isOpened={mediaManager.modal_isMoveFileModalOpened}
              onClose={() => {
                setMediaManager(prevState => ({
                  ...prevState,
                  modal_isMoveFileModalOpened: false,
                }))
              }}
              selectedFileId={mediaManager.selectedFileId}
              selectFileName={mediaManager.selectFileName}
            />

            <NewFolderSelectionModal
              isOpened={mediaManager.modal_isNewFolderModalOpened}
              onClose={() => {
                setMediaManager(prevState => ({
                  ...prevState,
                  modal_isNewFolderModalOpened: false,
                }))
              }}
            />

            <RenameFileSelectionModal
              isOpened={mediaManager.modal_isRenameFileModalOpened}
              onClose={() => {
                setMediaManager(prevState => ({
                  ...prevState,
                  modal_isRenameFileModalOpened: false,
                }))
              }}
            />

            <RenameFolderSelectionModal
              isOpened={mediaManager.modal_isRenameFolderModalOpened}
              onClose={() => {
                setMediaManager(prevState => ({
                  ...prevState,
                  modal_isRenameFolderModalOpened: false,
                }))
              }}
            />
          </>
        )}
      </Box>

    </>
  );
}

export default MediaFolderView;
