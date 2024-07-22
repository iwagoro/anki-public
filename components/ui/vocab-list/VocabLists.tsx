"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import VocabListCard from "./VocabListCard";
import { vocabListType } from "@/lib/types";

import { AuthContext } from "@/provider/AuthProvider";
import { Skeleton } from "@/components/shadcn/skeleton";
import fetcher from "@/lib/fetcher";
import AddDialog from "./dialogs/AddDialog";
import { useSearchParams } from "next/navigation";
import { H4, Mute } from "@/components/shadcn/typography";
import useWord from "@/app/vocab-list/useWord";

export default function VocabLists() {
    const { user } = useContext(AuthContext);
    const params = useSearchParams();
    const folderId = params.get("id");
    const { applyUpdate } = useWord();
    const endpoint = folderId ? `/vocab-list/folder/?id=${folderId}` : "/vocab-list/unfoldered";
    const { data: vocabLists, error, isLoading } = useSWR(user.token ? [endpoint, user.token] : null, ([url, token]) => fetcher(url, token));

    const [vocabListCards, setVocabListCards] = useState<ReactNode[]>([<Skeleton key="loading" className="w-full h-20" />]);

    useEffect(() => {
        if (Array.isArray(vocabLists) && vocabLists.length > 0) {
            const cards = vocabLists.map((list: vocabListType) => <VocabListCard key={list.id} list={list} />);
            setVocabListCards(cards);
        } else {
            setVocabListCards([
                <Mute key="no content" className="w-full text-center">
                    No Contents
                </Mute>,
            ]);
        }
    }, [vocabLists]);

    useEffect(() => {
        applyUpdate();
    }, []);

    return (
        <div className="w-full">
            <div className="w-full flex justify-between">
                <H4 className="mb-5">Vocab Lists</H4>
                <AddDialog />
            </div>
            <div className="w-full flex flex-col gap-5">{vocabListCards}</div>
        </div>
    );
}
