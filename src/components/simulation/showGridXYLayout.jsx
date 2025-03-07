import { useMutation, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

import { GET_ENTIRE_GRID } from "../../utils/gql/getEntireGrid";
import { SET_CELL_ALIVE_VALUE } from "../../utils/gql/setCellAliveValue";

const formatData = (data) => {
  if (!data?.cells) return { nodes: [], links: [] }; // Ensure it always returns an object

  const nodes = [];
  const links = new Set(); // Use Set to prevent duplicate links

  const GRID_SPACING = 100; // Distance between nodes in grid

  data.cells.forEach((a) => {
    nodes.push({
      id: a.id,
      __typename: a.__typename,
      alive: a.alive,
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

export default function DisplayGrid() {
  const fgRef = useRef();
  const [isUpdating, setIsUpdating] = useState(false);

  // Define useMutation at the top level
  const [updateCellAliveStatus] = useMutation(SET_CELL_ALIVE_VALUE, {
    onCompleted: () => {
      console.log("Updated cells");
      setIsUpdating(false);
    },
    onError: (error) => {
      console.log("Error:", error);
      setIsUpdating(false);
    },
    refetchQueries: [{ query: GET_ENTIRE_GRID, awaitRefetchQueries: true }],
  });

  const { loading, error, data } = useQuery(GET_ENTIRE_GRID);
  const myGraphData = data ? formatData(data) : { nodes: [], links: [] };

  if (loading) {
    console.log("Loading");
  }

  if (data && isUpdating) {
    setIsUpdating(false);
  }

  if (error) return <p>Error: {error.message}</p>;

  // Custom node rendering function
  const drawNode = (node, ctx, globalScale) => {
    const radius = 8 / globalScale;

    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);

    if (node.alive) {
      ctx.fillStyle = "green"; // Alive nodes are solid green
      ctx.fill();
    } else {
      ctx.fillStyle = "white"; // Dead nodes are yellow
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black"; // Black outline
      ctx.stroke();
    }
  };

  const handleNodeClick = (node) => {
    if (isUpdating) return; // Prevent multiple rapid clicks
    setIsUpdating(true);

    const request_where = { id: { eq: node.id } };
    const request_update = { alive: { set: !node.alive } };

    console.log("Request variables", request_where, request_update);

    updateCellAliveStatus({
      variables: { where: request_where, update: request_update },
    });
  };

  return (
    <div className={isUpdating ? "cursor-progress" : "cursor-pointer"}>
      <ForceGraph2D
        graphData={myGraphData}
        ref={fgRef}
        linkColor={() => "#00c7e3"}
        linkWidth={1}
        nodeRelSize={8}
        enableNodeDrag={false}
        d3VelocityDecay={0}
        cooldownTicks={0}
        panInteraction={false}
        d3AlphaMin={1}
        zoom={false}
        onEngineStop={() => fgRef.current?.zoomToFit(400)}
        onNodeClick={handleNodeClick}
        nodeCanvasObject={drawNode} // 🎨 Custom node rendering function
      />
    </div>
  );
}
