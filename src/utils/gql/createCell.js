/* Just the GraphQL query  to create the grid



*/

import { gql } from "@apollo/client";

export const CREATE_ENTIRE_GRID = gql`
  mutation createCells($input: [CellCreateInput!]!) {
    createCells(input: $input) {
      cells {
        nextState
        state
        id
        x
        y
      }
    }
  }
`;

export const cellsToCreate = `
{
  "input": [
    {
      "alive": false,
      "x": "1",
      "y": "1",
      "id": "1_1"
    },
    {
      "alive": false,
      "x": "1",
      "y": "2",
      "id": "1_2"
    },
  ]
}
`;
