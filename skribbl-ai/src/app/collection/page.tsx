"use client";

import { useQuery } from "convex/react";
import { Key } from "react";

export default function Home() {
  const saveSketchMutation = useQuery("sketches:getSketches");
  console.log(saveSketchMutation);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {saveSketchMutation.map(sketch => (
          <div key={sketch._id}>{sketch.prompt}</div>
        ))}
      </div>
    </main>
  );
}
