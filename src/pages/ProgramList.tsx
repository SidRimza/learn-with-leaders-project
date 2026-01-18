import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export default function ProgramList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("programs").select("*");
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <p>Loading programs...</p>;
  if (error) return <p>Error loading programs</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Programs</h1>
      <div className="grid gap-4 max-w-2xl">
        {data?.map((program) => (
          <div
            key={program.id}
            className="border rounded p-4 bg-white shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-1">{program.title}</h2>

            <p className="text-gray-600 mb-2">{program.description}</p>

            <a
              href={`/program/${program.id}`}
              className="text-blue-600 text-sm hover:underline"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
