/* 
GraphQL mutation to delete the entire grid
*/

import { gql } from "@apollo/client";

export const DELETE_ENTIRE_GRID = gql`
  mutation deleteEntireGrid {
    deleteCells {
      relationshipsDeleted
      nodesDeleted
    }
  }
`;
