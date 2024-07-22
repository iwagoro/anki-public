"use client";
import { Mute, P } from "@/components/shadcn/typography";
import fetcher from "@/lib/fetcher";
import { AuthContext } from "@/provider/AuthProvider";
import { useState, useEffect, useContext, ReactNode } from "react";
import useSWR from "swr";
import WordInfo from "./wordInfo";
import { Search } from "lucide-react";
export default function WordResult({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const { user } = useContext(AuthContext);
    const target = searchParams.target;
    const [wordCards, setWordCards] = useState<ReactNode[]>([
        <Mute key="no content" className="w-full text-center">
            No Contents
        </Mute>,
    ]);
    const { data, error, isLoading } = useSWR(user && target ? ["/word/search", target] : null, ([url, searchWord]) => fetcher(url, user.token, { searchWord: searchWord }));

    useEffect(() => {
        if (data && Array.isArray(data?.words) && data.words.length > 0) {
            const words = data.words;
            const cards = words?.map((word: any) => (
                <WordInfo key={word.id} word={word}>
                    <div key={word.id} className="w-full rounded-xl p-5 cursor-pointer flex gap-3 items-center bg-muted/60">
                        <Search size={16} />
                        <P>{word.word}</P>
                    </div>
                </WordInfo>
            ));
            setWordCards(cards);
        } else {
            setWordCards([
                <Mute key="no content" className="w-full text-center">
                    No Contents
                </Mute>,
            ]);
        }
    }, [data]);

    return <div className="flex gap-5 flex-col w-full">{wordCards}</div>;
}
