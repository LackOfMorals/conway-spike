/* Just the GraphQL query  to create the grid



*/

import { gql } from "@apollo/client";

export const CREATE_ENTIRE_GRID = gql`
  mutation CreateGrid($x: Int!, $y: Int!) {
    createGrid(x: $x, y: $y) {
      id
      cells {
        id
        x
        y
        state
        connectedCells {
          id
        }
      }
    }
  }
`;
