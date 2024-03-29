"use client";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef, useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import Link from "next/link";

export default function Home() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchesQuery = useQuery(api.sketches.getSketches);

  const [color, setColor] = useState("black");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    prompt: string;
  }>();

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  return (
    <main className="flex bg-purple-300 min-h-screen flex-col items-center pt-8">
      <div className="text-5xl pb-8">
        <p>✏️SKRIBBL.AI🤖</p>
      </div>
      <div className=" mx-auto flex gap-4 px-8">
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            await saveSketchMutation({ ...formData, image });
          })}
        >
          <div className="text-4xl">
            <Label htmlFor="prompt">Prompt</Label>
            <Input
              id="prompt"
              {...register("prompt", { required: true })}
              style={{ backgroundColor: "white" }}
            />
            {errors.prompt && <span className="text-lg">This field is required</span>}
            <br></br>
            <Label className="mt-4">Canvas (Draw something below)</Label>
          </div>

          <ReactSketchCanvas
            ref={canvasRef}
            style={{ width: 1200, height: 500 }}
            strokeWidth={6}
            strokeColor={color}
            eraserWidth={26}
          />
          <div className="flex flex-row justify-between">
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => {
                canvasRef.current?.clearCanvas();
              }}
            >
              ❌
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => {
                canvasRef.current?.eraseMode(true);
              }}
            >
              Eraser
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => {
                canvasRef.current?.eraseMode(false);
              }}
            >
              ✏️
            </Button>
            <Button type="button" variant={"ghost"}>
              <Link href={"/collection"}>Collection</Link>
            </Button>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
