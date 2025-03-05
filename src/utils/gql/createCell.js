/* Just the GraphQL query  to create the grid



*/

import { gql } from "@apollo/client";

export const CREATE_ENTIRE_GRID = gql`
  mutation createCells($input: [CellCreateInput!]!) {
    createCells(input: $input) {
      cells {
        id
      }
    }
  }
`;
