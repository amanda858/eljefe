









import { EdgesCommandCenter } from "@/components/edges-command-center";
import { getBackendTodayEdges } from "@/lib/backend-api";

export const metadata = {
    title: "El Jefe Sports - Command Center",
    description: "Filter live edges, inspect breakdowns, and move through the board from a single command center.",
};

export default async function BestEdgesPage() {
    const backendEdges = await getBackendTodayEdges();

    return (
        <main className="page-shell">
            <EdgesCommandCenter entries={backendEdges} />
        </main>
    );
}
