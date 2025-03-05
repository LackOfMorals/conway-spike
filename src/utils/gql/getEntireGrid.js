/* Just the GraphQL query  to obtain the entire grid 

Array of cells , each with an array of connected cells

*/

import { gql } from "@apollo/client";

export const GET_ENTIRE_GRID = gql`
  query getEntireGrid {
    cells {
      alive
      id
      x
      y
      connectedCells {
        id
      }
    }
  }
`;
