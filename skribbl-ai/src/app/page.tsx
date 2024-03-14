"use client";
import { useMutation } from "convex/react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Home() {
  const saveSketchMutation = useMutation("sketches:saveSketch");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    prompt: string;
  }>();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={handleSubmit(async (formData) => {
          console.log(formData);
          const res = await saveSketchMutation(formData);
          console.log(res);
        })}
      >
        <input {...register("prompt", { required: true })} />
        {errors.prompt && <span>This field is required</span>}
        <br></br>
        <input type="submit" />
      </form>
    </main>
  );
}
