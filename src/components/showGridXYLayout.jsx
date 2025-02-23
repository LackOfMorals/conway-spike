// Import everything needed to use the `useQuery` hook
import { useQuery } from "@apollo/client";
import { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { GET_ENTIRE_GRID } from "../gql/getEntireGrid";

const formatData = (data) => {
  if (!data?.cells) return { nodes: [], links: [] }; // Ensure it always returns an object

  const nodes = [];
  const links = new Set(); // Use Set to prevent duplicate links

  const GRID_SPACING = 100; // Distance between nodes in grid

  data.cells.forEach((a) => {
    nodes.push({
      id: a.id,
      __typename: a.__typename,
      state: a.state,
      x: Number(a.x) * GRID_SPACING,
      y: Number(a.y) * GRID_SPACING,
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
        linkColor={() => "#999"}
        nodeColor={getNodeColor} // Set color based on state
        nodeRelSize={8}
        enableNodeDrag={false} // Prevents users from dragging nodes
        d3VelocityDecay={0} // Disables force layout
        d3AlphaMin={1} // Stops force simulation
        cooldownTicks={0} // Prevents repositioning
        onEngineStop={() => fgRef.current?.zoomToFit(400)}
        nodeLabel={(node) => {
          return node.state;
        }}
      />
    </div>
  );
}
