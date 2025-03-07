import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { CELLS_WITH_ALIVE_NEIGHBOURS } from "../../utils/gql/cellsWithAliveNeighbours";
import { GET_ENTIRE_GRID } from "../../utils/gql/getEntireGrid";
import { SET_CELL_ALIVE_VALUE } from "../../utils/gql/setCellAliveValue";

import DisplayGrid from "./showGridXYLayout";

export default function Simulation({ params, running }) {
  const [updateCellAliveStatus] = useMutation(SET_CELL_ALIVE_VALUE, {
    onCompleted: () => {
      console.log("Updated cell alive status");
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  const [fetchGrid, { data }] = useLazyQuery(CELLS_WITH_ALIVE_NEIGHBOURS, {
    fetchPolicy: "no-cache", // Prevents caching issues
  });

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      console.log("Fetching grid...");
      fetchGrid({ variables: { where: { alive: { eq: true } } } });
    }, 500); // Fetch every second (adjust as needed)

    return () => clearInterval(interval); // Cleanup on unmount or when `running` stops
  }, [running, fetchGrid]);

  useEffect(() => {
    if (!running || !data) return;

    let doUpdate = false;
    let request_where_alive = { id: { in: [] } };
    let request_update_alive = {};
    let request_where_dead = { id: { in: [] } };
    let request_update_dead = {};

    data.cells.forEach((cell) => {
      if (cell.connectedCells.length >= 2 && cell.connectedCells.length <= 3 && cell.alive) {
        console.log("Cell will stay alive:", cell.id);
      } else if (cell.alive) {
        console.log("Cell will die:", cell.id);
        request_where_dead.id.in.push(cell.id);
        request_update_dead = { alive: { set: false } };
        doUpdate = true;
      } else if (!cell.alive && cell.connectedCells.length === 3) {
        console.log("Cell will become alive:", cell.id);
        request_where_alive.id.in.push(cell.id);
        request_update_alive = { alive: { set: true } };
        doUpdate = true;
      }
    });

    if (doUpdate) {
      console.log("Updating grid...");
      updateCellAliveStatus({ variables: { where: request_where_alive, update: request_update_alive } });
      updateCellAliveStatus({
        variables: { where: request_where_dead, update: request_update_dead },
        refetchQueries: [{ query: GET_ENTIRE_GRID, awaitRefetchQueries: true }],
      });
    }
  }, [data, running, updateCellAliveStatus]);

  return (
    <div>
      <p>
        Simulation: {running ? "Running" : "Stopped"} 
      </p>
      <DisplayGrid />
    </div>
  );
}
