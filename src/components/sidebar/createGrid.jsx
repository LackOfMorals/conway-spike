import { useMutation } from "@apollo/client";
import { CREATE_ENTIRE_GRID } from "../../utils/gql/createCell";
import { GET_ENTIRE_GRID } from "../../utils/gql/getEntireGrid";
import { JOIN_CELLS_TOGETHER } from "../../utils/gql/joinCells";

/* By using refetchQueries with the same query used to get the grid, 
the display gets updated. */

export default function CreatesGrid({ params, running }) {
  var newCells = [];

  for (var i = 1; i <= params.cellsWidth; i++) {
    for (var k = 1; k <= params.cellsHeight; k++) {
      newCells.push({
        id: i.toString() + "_" + k.toString(),
        alive: false,
        x: i.toString(),
        y: k.toString(),
      });
    }
  }

  newCells = JSON.stringify(newCells);

  const [createGrid, { data, error }] = useMutation(CREATE_ENTIRE_GRID, {
    variables: {
      input: JSON.parse(newCells),
    },
    /* observe what the mutation response returns */
    onCompleted: (data) => {
      console.log("Created cells");
      DoStuff();
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
  });

  const [joinGridTogether] = useMutation(JOIN_CELLS_TOGETHER, {
    /* observe what the mutation response returns */
    onCompleted: () => {
      console.log("Completed building grid");
    },
    /* observe any error */
    onError: () => {
      console.log("Error");
    },
    /* Trigger a refresh which should cause the grid to display */
    refetchQueries: [
      {
        query: GET_ENTIRE_GRID,
        awaitRefetchQueries: true,
      },
    ],
  });

  const DoStuff = () => {
    joinGridTogether();
  };

  return (
    <div>
      <button
        className={
          !running
            ? "px-4 py-2 bg-sky-500 hover:bg-sky-700 rounded-full ... "
            : "bg-gray-300 px-4 py-2 rounded-full cursor-not-allowed opacity-50 "
        }
        onClick={() => createGrid()}
      >
        Create
      </button>
    </div>
  );
}
