/*import { Button, TextInput } from "@neo4j-ndl/react";
import DisplayGrid from "../../components/showGridXYLayout";

function Main() {
  return (
    <div className="n-flex n-flex-wrap ">
      <div className="w-1/5 h-full ">
        <div>
          <TextInput
            helpText="Number of cells across"
            label="X:"
            size="medium"
          />
        </div>
        <div>
          <TextInput helpText="Number of cells up" label="Y:" size="medium" />
        </div>
        <div className="n-size-full n-flex n-flex-col n-items-center n-justify-center n-rounded-md n-bg-palette-neutral-bg-weak n-box-border">
          <Button color="neutral" fill="outlined" size="medium" Start />
        </div>
        <div className="n-size-full n-flex n-flex-col n-items-center n-justify-center n-rounded-md n-bg-palette-neutral-bg-weak n-box-border">
          <Button color="neutral" fill="outlined" size="medium" Stop />
        </div>
      </div>
      <div className="w-4/5 h-full ">
        <DisplayGrid />
      </div>
    </div>
  );
}

export default Main; */

import { useState } from "react";
import DisplayGrid from "../../components/showGridXYLayout";

export default function Main() {
  const [params, setParams] = useState({
    cellsWidth: 50,
    cellsHeight: 100,
    step: 0,
  });
  const [running, setRunning] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 p-4">Conway Game Of Life</header>
      <div className="flex flex-row flex-grow">
        <aside className="w-64 p-4 bg-gray-200 hidden sm:block">
          <Sidebar
            params={params}
            setParams={setParams}
            setRunning={setRunning}
            running={running}
          />
        </aside>
        <main className="flex-grow p-4">
          <Simulation params={params} running={running} />
        </main>
      </div>
    </div>
  );
}

function Sidebar({ params, setParams, setRunning, running }) {
  const updateParam = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const incrementStep = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value + 1 }));
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Simulation Controls</h2>
      <label className="block mt-2">Cells across: {params.cellsWidth}</label>
      <input
        type="range"
        min="10"
        max="100"
        value={params.cellsWidth}
        onChange={(e) => updateParam("cellsWidth", Number(e.target.value))}
        className="w-full"
      />

      <label className="block mt-2">Cells up: {params.cellsHeight}</label>
      <input
        type="number"
        min="10"
        max="100"
        value={params.cellsHeight}
        onChange={(e) => updateParam("cellsHeight", Number(e.target.value))}
        className="w-full"
      />
      <button
        onClick={() => setRunning(true)}
        className="bg-sky-500 hover:bg-sky-700 rounded ..."
      >
        Start
      </button>
      <button
        onClick={() => setRunning(false)}
        className="bg-sky-500 hover:bg-sky-700 rounded ..."
      >
        Stop
      </button>
      <button
        value={params.step}
        onClick={(e) => incrementStep("step", Number(e.target.value))}
        className="bg-sky-500 hover:bg-sky-700 rounded ..."
      >
        Step
      </button>
    </div>
  );
}

function Simulation({ params, running }) {
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
