import WordTables from "./WordTables";
import WordFlipCard from "./WordFlipCard";
import { Button } from "@/components/shadcn/button";
import { Table, TicketPercent } from "lucide-react";
import Link from "next/link";

export default async function VocabList({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
    const mode = searchParams.mode;
    const listId = searchParams.id;

    return (
        <div className="w-full h-full  flex flex-col justify-start items-start gap-8">
            <div className="w-full flex justify-end">
                <Link href={`/vocab-list?id=${listId}&mode=${mode === "table" ? "flip" : "table"}`}>
                    <Button variant="outline" className="flex items-center gap-2">
                        {mode === "table" ? <Table size={16} /> : <TicketPercent size={16} />}
                        {mode === "table" ? "Flip Card" : "Table"}
                    </Button>
                </Link>
            </div>
            {mode === "table" ? <WordTables /> : <WordFlipCard />}
        </div>
    );
}
