// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { loadPageGraphQL } from '../store/loadPageData.store';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { createNormalSectionGraphQL } from '../store/createNormalSection.store';
import { createLoudSectionGraphQL } from '../store/createLoudSection.story';
import { deletePageLoudSectionGraphQL } from '../store/deleteLoudSection.store';
import { deletePageNormalSectionGraphQL } from '../store/deleteNormalSection.store';

export const SiteDesignerPageContext = React.createContext();

export function SiteDesignerPageProvider({ children }) {
  const router = useRouter();

  const { updateEntity, navigate } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  // selected
  const [id, setId] = useState()
  const [entity, setEntity] = useState()
  const [slug, setSlug] = useState()

  //component options
  const [isLoudSectionModalOpened, setIsLoudSectionModalOpened] = useState(false)
  const [loudSectionDeleteModal, setLoudSectionDeleteModal] = useState({
    isOpened: false,
    id: undefined,
    name: undefined,
    author: undefined,
  })
  const [isNormalSectionModalOpened, setIsNormalSectionModalOpened] = useState(false)
  const [normalSectionDeleteModal, setNormalSectionDeleteModal] = useState({
    isOpened: false,
    id: undefined,
    name: undefined,
    author: undefined,
  })
  const [loudSectionBuiltIn, setLoudSectionBuiltIn] = useState([])
  const [loudSectionBuiltInSelected, setLoudSectionBuiltInSelected] = useState()
  const [normalSectionBuiltIn, setNormalSectionBuiltIn] = useState([])
  const [normalSectionBuiltInSelected, setNormalSectionBuiltInSelected] = useState()

  // GUI
  const [loudSection, setLoudSection] = useState()
  const [sections, setSections] = useState([])
  const [isReady, setIsReady] = useState()
  const [isReadyValue, setIsReadyValue] = useState()
  const [isDraft, setIsDraft] = useState()
  const [isDraftValue, setIsDraftValue] = useState()
  const [isRecentlyCreated, setIsRecentlyCreated] = useState()
  const [status, setStatus] = useState()





  // const [selectionType, setSelectionType] = useState()
  // const [selectionId, setSelectionId] = useState()
  // const [webAssetImport, setWebAssetImport] = useState()
  // const [menu, setMenu] = useState()
  // const [userAnswers, setUserAnswers] = useState()

  // // selections
  // const [isSelectionModalOpened, setIsSelectionModalOpened] = useState(false)













  const selectLoudSectionComponent = ({ id }) => {
    const data = loudSectionBuiltIn.filter((component) => component.id === id)[0];
    setLoudSectionBuiltInSelected({ ...data })
  }

  const getNextLoudSectionComponent = () => {
    const index = loudSectionBuiltIn.findIndex((component) => component.id === loudSectionBuiltInSelected.id);

    if (index !== -1 && index < loudSectionBuiltIn.length - 1) {
      return loudSectionBuiltIn[index + 1];
    }

    return loudSectionBuiltIn[0];
  };

  const getPreviousLoudSectionComponent = () => {
    const index = loudSectionBuiltIn.findIndex((component) => component.id === loudSectionBuiltInSelected.id);

    if (index !== -1 && index > 0) {
      return loudSectionBuiltIn[index - 1];
    }

    return loudSectionBuiltIn[loudSectionBuiltIn.length - 1]; // Return the last component if the component with the given ID is not found or if it's the first component
  };

  const selectNormalSectionComponent = ({ id }) => {
    const data = normalSectionBuiltIn.filter((component) => component.id === id)[0];
    setNormalSectionBuiltInSelected({ ...data })
  }

  const getNextNormalSectionComponent = () => {
    const index = normalSectionBuiltIn.findIndex((component) => component.id === normalSectionBuiltInSelected.id);

    if (index !== -1 && index < normalSectionBuiltIn.length - 1) {
      return normalSectionBuiltIn[index + 1];
    }

    return normalSectionBuiltIn[0];
  };

  const getPreviousNormalSectionComponent = () => {
    const index = normalSectionBuiltIn.findIndex((component) => component.id === normalSectionBuiltInSelected.id);

    if (index !== -1 && index > 0) {
      return normalSectionBuiltIn[index - 1];
    }

    return normalSectionBuiltIn[normalSectionBuiltIn.length - 1]; // Return the last component if the component with the given ID is not found or if it's the first component
  };

  const createNormalSection = (info) => {
    createNormalSectionGraphQL({
      pageId: router.query.pageId,
      selectionId: info.id,
      selectionType: info.type,
    }).then(response => {
      const data = response.data.backendSiteDesignerPageSectionNormal_addOne

      navigate(`/portal/site/pages/${router.query.pageId}/section/${data.id}`)
    })
  }

  const createLoudSection = (info) => {
    createLoudSectionGraphQL({
      pageId: router.query.pageId,
      selectionId: info.id,
      selectionType: "BUILT_IN",
    }).then(response => {
      const data = response.data.backendSiteDesignerPageSectionLoud_upsertOne

      navigate(`/portal/site/pages/${router.query.pageId}/loud-section/${data.id}`)
    })
  }

  const handleLoudSectionDeletion = () => {
    if (loudSectionDeleteModal?.id) {
      deletePageLoudSectionGraphQL({
        id: loudSectionDeleteModal?.id,
      }).then(response => {
        enqueueSnackbar(`Deleted loud section!`)
        init();
      })
    }
  }

  const handleNormalSectionDeletion = () => {
    if (normalSectionDeleteModal?.id) {
      deletePageNormalSectionGraphQL({
        id: normalSectionDeleteModal?.id,
      }).then(response => {
        enqueueSnackbar(`Deleted section!`)
        init();

      })
    }
  }



  useEffect(() => {

    if (normalSectionBuiltIn[0]) {

      selectNormalSectionComponent({
        id: normalSectionBuiltIn[0].id
      })

    }
  }, [normalSectionBuiltIn])

  useEffect(() => {
    if (loudSectionBuiltIn[0]) {

      selectLoudSectionComponent({
        id: loudSectionBuiltIn[0].id
      })

    }
  }, [loudSectionBuiltIn])

  const init = () => {
    loadPageGraphQL({
      pageId: router.query.pageId,
      socketId: getSocketId(),
    }).then(response => {

      const pageData = response.data.backendSiteDesignerPage_getOneRealTimeById
      const loudBuiltInData = response.data.backendSiteDesignerPageSectionLoudBuiltIn_getMany
      const normalBuiltInData = response.data.backendSiteDesignerPageSectionNormalBuiltIn_getMany
      const sectionsData = response.data.backendSiteDesignerPageSectionNormal_getManyByPageId
      const loudSectionData = response.data.backendSiteDesignerPageSectionLoud_getOneByPageId


      if (pageData) {
        setId(pageData.id)
        updateEntity({
          entity: pageData.entity
        })
        setEntity(pageData.entity)
        setIsReady(pageData.isReady)
        setIsDraft(pageData.isDraft)
        setIsRecentlyCreated(pageData.isRecentlyCreated)
        setStatus(pageData.status)
        setSlug(pageData.slug)
      }

      const loudHomePageSectionBuiltIn = loudBuiltInData.filter(l => l.category === "HOMEPAGE")
      const loudNormalPageSectionBuiltIn = loudBuiltInData.filter(l => l.category === "NORMALPAGE")

      setLoudSectionBuiltIn(
        pageData.slug === "/"
          ? [...loudHomePageSectionBuiltIn, ...loudNormalPageSectionBuiltIn]
          : [...loudNormalPageSectionBuiltIn, ...loudHomePageSectionBuiltIn]
      )

      const normalTextPageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "TEXT")
      const normalImagePageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "IMAGE")
      const normalListPageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "LIST")
      const normalOtherPageSectionBuiltIn = normalBuiltInData.filter(l => l.category === "OTHER")

      setNormalSectionBuiltIn([
        ...normalTextPageSectionBuiltIn,
        ...normalImagePageSectionBuiltIn,
        ...normalListPageSectionBuiltIn,
        ...normalOtherPageSectionBuiltIn,
      ])

      // setIsReady(data.isReady)

      if (sectionsData) {
        setSections(sectionsData)
      }

      if (loudSectionData !== undefined) {
        setLoudSection(loudSectionData)
      }

      setIsLoaded(true)
    })
  }

  useEffect(() => {
    init()
  }, [])


  return (
    <SiteDesignerPageContext.Provider value={{
      isLoaded, setIsLoaded,
      //selected
      id, setId,
      slug, setSlug,
      entity, setEntity,


      isLoudSectionModalOpened, setIsLoudSectionModalOpened,
      loudSectionDeleteModal, setLoudSectionDeleteModal,
      isNormalSectionModalOpened, setIsNormalSectionModalOpened,
      normalSectionDeleteModal, setNormalSectionDeleteModal,
      loudSectionBuiltIn, setLoudSectionBuiltIn,
      loudSectionBuiltInSelected, setLoudSectionBuiltInSelected,
      normalSectionBuiltIn, setNormalSectionBuiltIn,
      normalSectionBuiltInSelected, setNormalSectionBuiltInSelected,

      isReady, setIsReady,
      isReadyValue, setIsReadyValue,
      isDraft, setIsDraft,
      isDraftValue, setIsDraftValue,
      isRecentlyCreated, setIsRecentlyCreated,
      status, setStatus,

      loudSection, setLoudSection,
      sections, setSections,

      // functions
      selectLoudSectionComponent,
      getNextLoudSectionComponent,
      getPreviousLoudSectionComponent,
      selectNormalSectionComponent,
      getNextNormalSectionComponent,
      getPreviousNormalSectionComponent,

      createNormalSection,
      createLoudSection,

      handleLoudSectionDeletion,
      handleNormalSectionDeletion,
    }}>
      {children}
    </SiteDesignerPageContext.Provider>
  )
}

export default SiteDesignerPageProvider