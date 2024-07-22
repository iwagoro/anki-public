"use client";
import fetcher from "@/lib/fetcher";
import { AuthContext } from "@/provider/AuthProvider";
import { useState, useEffect, useContext, ReactNode } from "react";
import useSWR from "swr";
import VocabListCard from "@/components/ui/vocab-list/VocabListCard";
import { Mute } from "@/components/shadcn/typography";
export default function VocabListResult({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const { user } = useContext(AuthContext);
    const target = searchParams.target;
    const [vocabListCards, setvocabListCards] = useState<ReactNode[]>([
        <Mute key="no content" className="w-full text-center">
            No Contents
        </Mute>,
    ]);
    const { data, error, isLoading } = useSWR(user && target ? ["/word/search", target] : null, ([url, searchWord]) => fetcher(url, user.token, { searchWord: searchWord }));

    useEffect(() => {
        if (data && Array.isArray(data?.vocab_lists) && data.vocab_lists.length > 0) {
            const vocabLists = data.vocab_lists;
            const cards = vocabLists?.map((vocabList: any) => <VocabListCard key={vocabList.id} list={vocabList} />);
            setvocabListCards(cards);
        } else {
            setvocabListCards([
                <Mute key="no content" className="w-full text-center">
                    No Contents
                </Mute>,
            ]);
        }
    }, [data]);

    return <div className="flex gap-5 flex-col w-full">{vocabListCards}</div>;
}
