import DisplayGrid from "../../components/showGridXYLayout";

export default function Simulation({ params, running }) {
  return (
    <div>
      <p>
        Simulation:{running ? "Running" : "Stopped"} Step:{params.step} Cells
        across:{params.cellsWidth} Cells up:{params.cellsHeight}
      </p>
      <DisplayGrid />
    </div>
  );
}
