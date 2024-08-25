// Libraries
import React, { createContext, useEffect, useState } from 'react'
import { getMediaManagerPageGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getPage.store';
import { getMediaManagerModelGraphQL } from '../store/getMedia.store';
import { postMediaManagerFileChangeFolderGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-changeFolder.store';
import { getMediaManagerBreadCrumbsGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-breadCrumbs.store';

export const SelectMediaManagerContext = createContext();

export function SelectMediaManagerProvider({ children }) {

  const [selectedFolderId, setSelectedFolderId] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const [mediaManager, setMediaManager] = useState({

    //use for selecting items in drop downs
    selectedFolderId: null,
    selectedFileId: null,

    selectFolderName: "",
    selectFileName: "",

    // The explorer folder Id for the current page.
    explorerFolderId: null,

    // ui
    breadCrumbs: [],
    folders: [],
    files: [],


    // modals
    modal_isDeleteFileModalOpened: false,
    modal_isDeleteFolderFailedModalOpened: false,
    modal_isDeleteFolderModalOpened: false,
    modal_isMoveFileModalOpened: false,
    modal_isNewFolderModalOpened: false,
    modal_isRenameFileModalOpened: false,
    modal_isRenameFolderModalOpened: false,
    modal_isUploadFileModalOpened: false,

  })

  const getFoldersAndFilesForThisPage = () => {
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
  }


  const selectImage = ({ imageId }) => {

    const image = mediaManager.files.filter(f => f.id === imageId)[0]

    setSelectedImage(image)

    return image?.url
  }

  const selectFolder = ({ folderId, cb }) => {
    getMediaManagerModelGraphQL({
      folderId,
    }).then(result => {
      const foldersFromServer = result.data.backendMediaManagerFolder_getMany
      const filesFromServer = result.data.backendMediaManagerFile_getMany
      // const breadCrumbs = result.data.backendMediaManagerFolder_getBreadCrumb

      console.log('filesFromServer', filesFromServer)

      setMediaManager(prevState => ({
        ...prevState,
        folders: foldersFromServer,
        files: filesFromServer,
        explorerFolderId: folderId,
        breadCrumbs: folderId ? result.data.backendMediaManagerFolder_getBreadCrumb : [],
      }))

      setSelectedFolderId(folderId)
      setSelectedImage(null)


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

          if (cb) cb();
        })
      } else {
        setMoveFileExplorer(prevState => ({
          ...prevState,
          breadCrumbs: [{ id: 'root', name: 'Media Manager' }],
        }))

        if (cb) cb();
      }

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
        explorerFolderId: folderId,
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
    console.log('postFileWithMovedFolder(id, folderId)', id, folderId)
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
    <SelectMediaManagerContext.Provider value={{
      mediaManager, setMediaManager,
      moveFileExplorer, setMoveFileExplorer,
      selectedImage, setSelectedImage,



      // functions
      selectImage,
      selectFolder,
      changeFileExplorerFolder,
      postFileWithMovedFolder,
      getFoldersAndFilesForThisPage,
    }}>
      {children}
    </SelectMediaManagerContext.Provider>
  )
}

export default SelectMediaManagerProvider