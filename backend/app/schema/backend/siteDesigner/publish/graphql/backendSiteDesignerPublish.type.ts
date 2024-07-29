import gql from "graphql-tag"
import { paginationType } from "../../../../utils";

const backendSiteDesignerPublishType = gql`

  type Mutation {
    backendSiteDesignerPublish_publishSite: GlobalSuccessType
  }
`;
export default backendSiteDesignerPublishType;
