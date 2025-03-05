import { DELETE_ENTIRE_GRID } from "../../utils/gql/deleteCells";
import { GET_ENTIRE_GRID } from "../../utils/gql/getEntireGrid";

import { useMutation } from "@apollo/client";

/* By using refetchQueries with the same query used to get the grid, 
the display gets updated. */

export default function ResetsGrid() {
  const [deleteGrid, { data }] = useMutation(DELETE_ENTIRE_GRID, {
    refetchQueries: [
      {
        query: GET_ENTIRE_GRID,
        awaitRefetchQueries: true,
      },
    ],
  });

  return (
    <div>
      <button
        className="px-4 py-2 bg-sky-500 hover:bg-sky-700 rounded ..."
        onClick={() => deleteGrid()}
      >
        Reset Grid
      </button>
    </div>
  );
}
