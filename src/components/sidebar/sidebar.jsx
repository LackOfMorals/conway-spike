import CreatesGrid from "./createGrid";
import ResetsGrid from "./resetGrid";

export default function Sidebar({ params, setParams, setRunning, running }) {
  const updateParam = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const incrementStep = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value + 1 }));
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Simulation</h2>
      <p>Grid choices</p>
      <div className="flex-row mt-4">
        <label className="block mt-2">Cells across: {params.cellsWidth}</label>
        <input
          type="range"
          min="10"
          max="100"
          value={params.cellsWidth}
          onChange={(e) => updateParam("cellsWidth", Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex-row mt-4">
        <label className="block mt-2">Cells up: {params.cellsHeight}</label>
        <input
          type="range"
          min="10"
          max="100"
          value={params.cellsHeight}
          onChange={(e) => updateParam("cellsHeight", Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex-rowv mt-4">
        <CreatesGrid params={params} running={running} />
      </div>
      <div className="flex-rowv mt-4">
        <ResetsGrid running={running} />
      </div>
      <div className="flex-row mt-4">
        <hr className="h-px my-8 bg-red-400 border-0 dark:bg-red-700" />
      </div>
      <p>Controls</p>
      <div className="flex-row mt-4">
        <button
          onClick={() => setRunning(true)}
          className="px-6 py-2 bg-sky-500 hover:bg-sky-700 rounded-full ..."
        >
          Start
        </button>
      </div>
      <div className="flex-row mt-4">
        <button
          onClick={() => setRunning(false)}
          className="px-6 py-2 bg-sky-500 hover:bg-sky-700 rounded-full ..."
        >
          Stop
        </button>
      </div>
      <div className="flex-rowv mt-4">
        <button
          value={params.step}
          onClick={(e) => incrementStep("step", Number(e.target.value))}
          className="px-6 py-2 bg-sky-500 hover:bg-sky-700 rounded-full ..."
        >
          Step
        </button>
      </div>
    </div>
  );
}
