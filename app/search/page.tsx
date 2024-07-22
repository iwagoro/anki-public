"use server";
import { Suspense } from "react";
import SearchInput from "./SearchInput";
import WordResult from "./WordResult";
import FolderResult from "./FolderResult";
import VocabListResult from "./VocabListResult";
import { H3 } from "@/components/shadcn/typography";
import DictionaryResult from "./DictionaryResult";
import Tabs from "./Tabs";

export default async function Home({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
    const focus = searchParams.focus;
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchInput />
            </Suspense>
            <Tabs searchParams={searchParams} />
            {focus === undefined || focus === "folder" ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <H3>Folders</H3>
                    <FolderResult searchParams={searchParams} />
                </Suspense>
            ) : null}
            {focus === undefined || focus === "vocab-list" ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <H3>Vocab Lists</H3>
                    <VocabListResult searchParams={searchParams} />
                </Suspense>
            ) : null}
            {focus === undefined || focus === "word" ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <H3>Words</H3>
                    <WordResult searchParams={searchParams} />
                </Suspense>
            ) : null}
            {focus === undefined || focus === "dictionary" ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <H3>Dictionary</H3>
                    <DictionaryResult searchParams={searchParams} />
                </Suspense>
            ) : null}
        </div>
    );
}
