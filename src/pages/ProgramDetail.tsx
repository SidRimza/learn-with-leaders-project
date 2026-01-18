import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function ProgramDetail() {
  const [applied, setApplied] = useState(false);
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["program", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("programs")
        .select("*")
        .eq("id", id)
        .single();
      return data;
    },
  });

  useEffect(() => {
    const checkIfApplied = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !id) return;

      const { data } = await supabase
        .from("applications")
        .select("id")
        .eq("program_id", id)
        .eq("student_id", user.id)
        .single();

      if (data) {
        setApplied(true);
      }
    };

    checkIfApplied();
  }, [id]);

  const applyToProgram = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("applications").insert({
      program_id: id,
      student_id: user.id,
      status: "pending",
    });

    setApplied(true);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>

      <p className="text-gray-600 mb-4">{data.description}</p>

      <button
        onClick={applyToProgram}
        disabled={applied}
        className={`px-4 py-2 rounded ${
          applied ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
        }`}
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}
