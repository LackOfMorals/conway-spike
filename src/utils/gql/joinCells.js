/* Just the GraphQL query  to create the grid



*/

import { gql } from "@apollo/client";

export const JOIN_CELLS_TOGETHER = gql`
  mutation MyMutation {
    joinCellsTogetherIntoGrid
  }
`;
