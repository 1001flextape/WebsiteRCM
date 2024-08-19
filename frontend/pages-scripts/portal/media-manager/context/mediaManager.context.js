// Libraries
import React, { createContext, useEffect, useState } from 'react'
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';
import { getMediaManagerBreadCrumbsGraphQL } from '../store/mediaManager-breadCrumbs.store';
import { postMediaManagerFileChangeFolderGraphQL } from '../store/mediaManager-changeFolder.store';
import { useRouter } from 'next/router';

export const MediaManagerContext = createContext();

export function MediaManagerProvider({ children }) {
  const router = useRouter()

  const [mediaManager, setMediaManager] = useState({

    //use for selecting items in drop downs
    selectedFolderId: null,
    selectedFileId: null,

    selectFolderName: "",
    selectFileName: "",

    // if the page is on a folder
    selectedFolderId: null,

    // ui
    folders: [],
    files: [],


    // modals
    modal_isNewFolderModalOpened: false,
    modal_isDeleteFileModalOpened: false,
    modal_isDeleteFolderModalOpened: false,
    modal_isDeleteFolderFailedModalOpened: false,
    modal_isRenameFileModalOpened: false,
    modal_isRenameFolderModalOpened: false,
    modal_isRestoreFileModalOpened: false,
    modal_isUploadFileModalOpened: false,
    modal_isMoveFileModalOpened: false,
  })

  const getFoldersAndFilesForThisPage = () => {
    getMediaManagerPageGraphQL({
      folderId: router.query?.id,
    }).then(result => {
      const foldersFromServer = result.data.backendMediaManagerFolder_getMany
      const filesFromServer = result.data.backendMediaManagerFile_getMany

      setMediaManager(prevState => ({
        ...prevState,
        files: filesFromServer,
        folders: foldersFromServer
      }))
    })
  }

  const [moveFileExplorer, setMoveFileExplorer] = useState({
    folders: [],
    files: [],
    breadCrumbs: [],
  })

  const changeFileExplorerFolder = (folderId) => {
    getMediaManagerPageGraphQL({
      folderId: folderId || null,
    }).then(result => {
      const foldersFromServer = result.data.backendMediaManagerFolder_getMany
      const filesFromServer = result.data.backendMediaManagerFile_getMany

      setMoveFileExplorer(prevState => ({
        ...prevState,
        folders: foldersFromServer || [],
        files: filesFromServer || [],
      }))

      if (folderId) {
        getMediaManagerBreadCrumbsGraphQL({
          folderId: folderId || null,
        }).then(result => {

          let newBreadCrumbs = result.data?.backendMediaManagerFolder_getBreadCrumb || []
          newBreadCrumbs = newBreadCrumbs.sort((a, b) => b.order - a.order)
          // setBreadCrumbs(newBreadCrumbs)
          setMoveFileExplorer(prevState => ({
            ...prevState,
            breadCrumbs: newBreadCrumbs ? [{ id: 'root', name: 'Media Manager' }, ...newBreadCrumbs] : [{ id: 'root', name: 'Media Manager' }],
          }))

        })
      } else {
        setMoveFileExplorer(prevState => ({
          ...prevState,
          breadCrumbs: [{ id: 'root', name: 'Media Manager' }],
        }))
      }
    })
  }

  const postFileWithMovedFolder = ({ id, folderId }) => {
    // id for media manager is root for UI.
    if (folderId === "root") {
      folderId = null;
    }

    postMediaManagerFileChangeFolderGraphQL({
      id, folderId
    }).then(response => {
      getFoldersAndFilesForThisPage();
    })
  }

  useEffect(() => {
    changeFileExplorerFolder()
  }, [])

  return (
    <MediaManagerContext.Provider value={{
      mediaManager, setMediaManager,
      moveFileExplorer, setMoveFileExplorer,

      // functions
      changeFileExplorerFolder,
      postFileWithMovedFolder,
    }}>
      {children}
    </MediaManagerContext.Provider>
  )
}

export default MediaManagerProvider