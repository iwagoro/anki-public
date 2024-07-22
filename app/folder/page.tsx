"use client";
import { Suspense } from "react";
import VocabLists from "@/components/ui/vocab-list/VocabLists";
import { useSearchParams } from "next/navigation";
export default function Folder() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <Suspense fallback={<div>Loading...</div>}>
                <VocabLists />
            </Suspense>
        </div>
    );
}
