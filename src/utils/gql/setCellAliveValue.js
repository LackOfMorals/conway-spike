/* Just the GraphQL query  to create the grid



*/

import { gql } from "@apollo/client";

export const SET_CELL_ALIVE_VALUE = gql`
  mutation changeCellAlive($where: CellWhere, $update: CellUpdateInput) {
  updateCells(where: $where, update: $update) {
    cells {
      alive
    }
  }
}
`;
