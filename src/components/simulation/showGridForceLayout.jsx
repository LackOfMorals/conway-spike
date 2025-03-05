// Import everything needed to use the `useQuery` hook
import { useQuery } from "@apollo/client";
import { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { GET_ENTIRE_GRID } from "../../gql/getEntireGrid";
/*
const formatData = (data) => {
  // this could be generalized but let's leave that for another time

  const nodes = [];
  const links = [];

  if (!data.cells) {
    return;
  }

  data.cells.forEach((a) => {
    nodes.push({
      __typename: a.__typename,
      id: a.id,
      state: a.state,
      x: a.x,
      y: a.y,
    });

    a.connectedCells.forEach((t) => {
      links.push({
        source: a.id,
        target: t.id,
      });
    });
  });

  return {
    // nodes may be duplicated so use lodash's uniqBy to filter out duplicates
    nodes,
    links,
  };
};

*/

const formatData = (data) => {
  if (!data?.cells) return { nodes: [], links: [] }; // Ensure it always returns an object

  const nodes = [];
  const links = new Set(); // Use Set to prevent duplicate links

  const GRID_SPACING = 50; // Distance between nodes in grid

  data.cells.forEach((a) => {
    nodes.push({
      id: a.id,
      __typename: a.__typename,
      state: a.state,
      /* Do not supply x & y values into the grid as those names are used by
      force graph and chaos will result if you do ...
      x: a.x,
      y: a.y,*/
    });

    a.connectedCells.forEach((t) => {
      links.add(JSON.stringify({ source: a.id, target: t.id })); // Prevent duplicates
    });
  });

  return {
    nodes,
    links: [...links].map((l) => JSON.parse(l)), // Convert back from Set
  };
};

// Define colors based on state value
const getNodeColor = (node) => {
  switch (node.state) {
    case "alive":
      return "green";
    case "dead":
      return "red";
    default:
      return "blue"; // Default color
  }
};

export default function DisplayGrid() {
  const fgRef = useRef();
  const { loading, error, data } = useQuery(GET_ENTIRE_GRID);
  const myGraphData = data ? formatData(data) : { nodes: [], links: [] };

  const mockData = {
    nodes: [{ id: "1" }, { id: "2" }],
    links: [{ source: "1", target: "2" }],
  };

  if (data) console.log("Formatted Data:", myGraphData);
  console.log("Mock data:", mockData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {" "}
      {/* Ensure canvas space */}
      <ForceGraph2D
        graphData={myGraphData}
        ref={fgRef}
        cooldownTicks={100}
        linkColor={() => "#999"}
        nodeColor={getNodeColor} // Set color based on state
        onEngineStop={() => fgRef.current && fgRef.current.zoomToFit(400)}
      />
    </div>
  );
}
