// Library
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// mine
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';
import DynamicComponent from '@/components/previews/DynamicComponent/DynamicComponent.component';
import { useTheme } from '@mui/material';
import { getClientPageIdBySlugGraphQL } from '@/pages-scripts/p/store/getClientPageId.store';
import { getClientPageGraphQL } from '@/pages-scripts/p/store/getClientPage.store';
import UnderConstructionScene from '@/components/under-contruction/UnderConstructionScene';
import { callApiMiddleware } from '@/utils/graphql/backend-api.middleware';
import { getRcmProps } from '@/components/rcm-components/getRcmProps';

const Page = (props) => {
  console.log('props', props)
  const router = useRouter()
  const theme = useTheme()

  const [isLoaded, setIsLoaded] = useState(true)
  const [componentProps, setComponentProps] = useState({})
  const [webAssetImport, setWebAssetImport] = useState()
  const [backgroundColor, setBackgroundColor] = useState()

  const createComponentProps = ({ organization, userAnswers, webAssetImport }) => {
    if (typeof (userAnswers) === "string") {
      userAnswers = JSON.parse(userAnswers)
    }

    return getRcmProps({
      user: userAnswers,
      state: {
        isFunctionalMode: true,
        isDisplayMode: false,
        isProdMode: true,
        isDevMode: false,
        // isDayMode: //added later
        // isNightMode //added later 
      },
    })
    // {
    //   user: userAnswers,
    //   system: {
    //     state: {
    //       isDisplayMode: false,
    //       isFunctionalMode: true,
    //       // isDayMode: //added later
    //       // isNightMode //added later 
    //     },
    //     // socials
    //   }

    // },

  }

  return (
    <>
      {isLoaded && (
        <>
          {props.isConstructionPage && (
            <UnderConstructionScene />
          )}
          {!props.isConstructionPage && (
            <>
              <div
                style={{
                  backgroundColor: backgroundColor,
                  minHeight: "390px",
                }}
              >
                {props?.header?.webAssetImport && (
                  <DynamicComponent
                    filePath={props.header.webAssetImport}
                    props={
                      createComponentProps({
                        userAnswers: props.header.userAnswers,
                      })
                    }
                  />
                )}

                {props?.loudSection?.webAssetImport && (
                  <DynamicComponent
                    filePath={props.loudSection.webAssetImport}
                    props={
                      createComponentProps({
                        userAnswers: props.loudSection.userAnswers,
                      })
                    }
                  />
                )}

                {props?.sections && props?.sections.map(section => (
                  <DynamicComponent
                    filePath={section.webAssetImport}
                    props={
                      createComponentProps({
                        userAnswers: section.userAnswers,
                        webAssetImport: section.webAssetImport,
                      })
                    }
                  />
                )
                )}


                {props?.footer?.webAssetImport && (
                  <DynamicComponent
                    filePath={props.footer.webAssetImport}
                    props={
                      createComponentProps({
                        userAnswers: props.footer.userAnswers,
                        webAssetImport: props.footer.webAssetImport,
                      })
                    }
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {

  const response = await getClientPageIdBySlugGraphQL({
    slug: `/`,
  })

  const pageId = response.clientSitePage_getOneBySlug.id

  const pageData = await getClientPageGraphQL({
    pageId,
  })

  return {
    props: {
      header: {
        webAssetImport: pageData.clientSiteHeader_getOne.webAssetImport,
        userAnswers: JSON.parse(pageData.clientSiteHeader_getOne?.userAnswersJsonB || "{}"),
      },
      footer: {
        webAssetImport: pageData.clientSiteFooter_getOne.webAssetImport,
        userAnswers: JSON.parse(pageData.clientSiteFooter_getOne?.userAnswersJsonB || "{}"),
      },
      loudSection: {
        webAssetImport: pageData.clientSitePageSectionLoud_getOneByPageId.webAssetImport,
        userAnswers: JSON.parse(pageData.clientSitePageSectionLoud_getOneByPageId?.userAnswersJsonB || "{}"),
      },
      sections: pageData.clientSitePageSectionNormal_getManyByPageId.map(section => {
        return {
          webAssetImport: section.webAssetImport,
          userAnswers: JSON.parse(section?.userAnswersJsonB || "{}"),
        }
      })
    }
  }
}


Page.getLayout = function getLayout(page) {
  return (
    <MainSiteLayout
      hasNoEntity
    >
      {page}
    </MainSiteLayout>
  );
};

export default Page;
