"use client";
import { H4, Mute } from "@/components/shadcn/typography";
import { Skeleton } from "@/components/shadcn/skeleton";
import useSWR from "swr";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import RecentVocabListCard from "./RecentVocabListCard";
import fetcher from "@/lib/fetcher";
import { vocabListType } from "@/lib/types";

export default function RecentVocabLists() {
    const { user } = useContext(AuthContext);
    const { data: recentVocabLists, error, isLoading } = useSWR(user.token ? ["/vocab-list/recent", user.token] : null, ([url, token]) => fetcher(url, token));
    const [recentVocabListsCards, setRecentVocabListsCards] = useState<ReactNode[]>([<Skeleton key="loading" className="w-full h-20 grid-row-1/3" />]);

    useEffect(() => {
        if (Array.isArray(recentVocabLists) && recentVocabLists.length > 0) {
            const cards = recentVocabLists.map((list: vocabListType) => <RecentVocabListCard key={list.id} list={list} />);
            setRecentVocabListsCards(cards);
        } else {
            setRecentVocabListsCards([
                <Mute key="no content" className="w-full text-center row-auto grid-row-1/3">
                    No Contents
                </Mute>,
            ]);
        }
    }, [recentVocabLists]);

    return (
        <div className="w-full">
            <H4 className="mb-5">Recently</H4>
            {recentVocabListsCards.length > 0 ? <div className="w-full grid grid-cols-2 gap-5">{recentVocabListsCards}</div> : recentVocabListsCards}
        </div>
    );
}
