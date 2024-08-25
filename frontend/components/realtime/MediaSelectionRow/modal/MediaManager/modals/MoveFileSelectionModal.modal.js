import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, ListItemIcon, Typography, Breadcrumbs, Link, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ImageIcon from '@mui/icons-material/Image';
import { SelectMediaManagerContext } from '../context/selectMediaManager.context';

const MoveFileSelectionModal = ({ isOpened, onClose, selectedFileId, selectFileName }) => {
  const {
    moveFileExplorer,
    changeFileExplorerFolder,

    // functions
    postFileWithMovedFolder,
  } = useContext(SelectMediaManagerContext);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
  };

  const handleFolderNavigate = (folder) => {
    changeFileExplorerFolder(folder.id);
  };

  useEffect(() => {
  }, [selectedFolder])

  const handleMove = () => {
    if (selectedFolder) {
      // Handle file move logic here
      postFileWithMovedFolder({
        id: selectedFileId,
        folderId: selectedFolder.id,
      })

      onClose();
    }
  };

  const handleNewFolder = () => {
    // Add logic for creating a new folder
    console.log("Creating a new folder");
  };

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        style: {
          padding: 0 // Set padding to zero for the Dialog Paper component
        }
      }}
    >
      <DialogTitle style={{ padding: '16px 24px', borderBottom: "2px solid rgb(188, 188, 188)" }}>
        Move File<small> "{selectFileName}"</small>
      </DialogTitle>
      <DialogContent
        style={{
          padding: '8px 0',
          minHeight: "200px",
          borderBottom: "2px solid rgb(188, 188, 188)",
          minWidth: "300px",
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <List style={{ padding: 0 }}>
            {moveFileExplorer.folders.map(folder => (
              <ListItem
                button
                key={folder.id}
                onClick={() => handleFolderSelect(folder)}
                onDoubleClick={() => handleFolderNavigate(folder)}
                style={{ padding: '8px 16px', position: 'relative', paddingRight: "70px" }}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={folder.name} />
                <ChevronRightIcon
                  style={{
                    position: 'absolute',
                    right: 16,
                    color: 'white',
                    backgroundColor: 'rgb(21, 77, 108)',
                    borderRadius: '50%',
                    padding: 4,
                    transition: 'background-color 0.3s',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleFolderNavigate(folder)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(14, 50, 70)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(21, 77, 108)'}
                />
              </ListItem>
            ))}
            {moveFileExplorer.files.map(file => (
              <ListItem
                button
                key={file.id}
                style={{ padding: '8px 16px', position: 'relative', opacity: 0.6 }} // Disabled appearance
              >
                <ListItemIcon>
                  <ImageIcon />
                </ListItemIcon>
                <ListItemText primary={file.userFileName} disableTypography />
              </ListItem>
            ))}
          </List>
        </div>
      </DialogContent>

      <DialogContent
        style={{
          padding: '8px 0',
          borderBottom: "2px solid rgb(188, 188, 188)",
        }}
      >
        {/* Breadcrumb below DialogContent */}
        <Breadcrumbs style={{ padding: '8px 16px' }}>
          {moveFileExplorer.breadCrumbs.map((crumb, index) => (
            <Link
              key={crumb.id}
              underline="hover"
              color="inherit"
              href="#"
              onClick={() => {
                if (crumb.id === "root") {
                  changeFileExplorerFolder()
                } else {
                  changeFileExplorerFolder(crumb.id)
                }
                handleFolderSelect(crumb)
              }}
            >
              {crumb.name}
            </Link>
          ))}
        </Breadcrumbs>
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px', display: 'flex', justifyContent: 'space-between' }}>
        {/* New Folder IconButton */}
        <IconButton onClick={handleNewFolder} color="primary" aria-label="create new folder">
          <CreateNewFolderIcon />
        </IconButton>
        <div>
          <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>Cancel</Button>
          <Button onClick={handleMove} disabled={!selectedFolder} variant="contained">Move</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default MoveFileSelectionModal;
