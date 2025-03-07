/* 
    Just the GraphQL query  to find cells that have alive immediate neighbours they have
    This is the information that we need to see if they stay as they are, turn dead, or become alive
*/

import { gql } from "@apollo/client";

export const CELLS_WITH_ALIVE_NEIGHBOURS = gql`
  query aliveCellsWithAliveNeighours($where: CellWhere) {
    cells {
      id
      alive
      connectedCells(where: $where) {
        id
      }
    }
  }
`;
