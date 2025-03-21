import { DELETE_ENTIRE_GRID } from "../../utils/gql/deleteCells";
import { GET_ENTIRE_GRID } from "../../utils/gql/getEntireGrid";

import { useMutation } from "@apollo/client";

/* By using refetchQueries with the same query used to get the grid, 
the display gets updated. 

We use running to determine if the button can be used or not
  If Conway is running, then cannot reset.  
  If Conway  is not running, then can reset.

*/

export default function ResetsGrid({ running }) {
  const [deleteGrid, { loading, data, error }] = useMutation(
    DELETE_ENTIRE_GRID,
    {
      /* observe what the mutation response returns */
      onCompleted: (data) => {
        console.log("Completed");
        console.log(data);
      },
      /* observe any error */
      onError: (error) => {
        console.log("Error");
        console.log(error);
      },
      refetchQueries: [
        {
          query: GET_ENTIRE_GRID,
          awaitRefetchQueries: true,
        },
      ],
    }
  );

  console.log("Running");
  console.log(running);

  return (
    <div>
      <button
        disabled={running}
        className={
          !running
            ? "px-4 py-2 bg-sky-500 hover:bg-sky-700 rounded-full ... "
            : "bg-gray-300 px-4 py-2 rounded-full cursor-not-allowed opacity-50 "
        }
        onClick={() => deleteGrid()}
      >
        {!running ? "Reset" : "Resetted"}
      </button>
    </div>
  );
}
