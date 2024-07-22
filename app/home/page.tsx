"use server";
import { Suspense } from "react";
import AddVocabButtons from "@/components/ui/AddVocabButtons";
import Folders from "@/components/ui/folders/Folders";
import VocabLists from "@/components/ui/vocab-list/VocabLists";
import RecnetVocabList from "@/components/ui/recently/vocab-list/RecentVocabList";
export default async function Home({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-8">
            <AddVocabButtons searchParams={searchParams} />
            <Suspense fallback={<div>Loading...</div>}>
                <RecnetVocabList />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <Folders />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <VocabLists />
            </Suspense>
        </div>
    );
}
