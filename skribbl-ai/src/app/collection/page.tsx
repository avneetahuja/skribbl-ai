"use client";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const sketches = useQuery(api.sketches.getSketches);

  // const sortedSketches = (sketches ?? []).sort((a, b) => {
  //   return b._creationTime - a._creationTime;
  // });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-purple-300">
      <h2>Recent Sketches (Only last 1 hour)</h2>
      <div className="grid grid-cols-4 gap-4">
        {sketches?.map((sketch) => {
          // Calculate the time difference in milliseconds
          const creationTime = new Date(sketch._creationTime);
          const currentTime = new Date();
          const timeDifference = currentTime.getTime() - creationTime.getTime();

          // Check if the time difference is less than 24 hours (in milliseconds)
          const twentyFourHoursInMilliseconds = 60 * 60 * 1000; // 24 hours in milliseconds
          if (timeDifference < twentyFourHoursInMilliseconds) {
            return (
              <div key={sketch._id}>
                <img
                width="500"
                height="500"
                src={sketch.result}
              />
              {/* <Image src={sketch.result} alt="Iamge" width={500} height={500}></Image> */}
              <p>{sketch.prompt}</p>
                </div>

            );
          }
        })}
      </div>
      <Link href={"../"}>Back</Link>
    </main>
  );
}
