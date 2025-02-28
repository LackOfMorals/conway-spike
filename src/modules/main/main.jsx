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
import Sidebar from "../sidebar/sidebar";
import Simulation from "../simulation/simulation";

export default function Main() {
  const [params, setParams] = useState({
    cellsWidth: 50,
    cellsHeight: 50,
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
