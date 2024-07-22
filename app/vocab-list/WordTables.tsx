"use client";
import React, { useContext, useState } from "react";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { AuthContext } from "@/provider/AuthProvider";
import { useSearchParams } from "next/navigation";
import WordDropDown from "./WordDropDown";
import { wordType } from "@/lib/types";
import { H3, P } from "@/components/shadcn/typography";
import WordInfoDialog from "./dialogs/WordInfoDialog";

export default function WordTables() {
    const { user } = useContext(AuthContext);
    const params = useSearchParams();
    const listId = params.get("id");
    const { data } = useSWR(user.token && listId ? [`/vocab-list/?id=${listId}`, user.token] : null, ([url, token]) => fetcher(url, token));
    const [isOpen, setIsOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState<wordType | null>(null);

    const handleDropDownClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div className="w-full  flex flex-col px-5  gap-10 pb-[70px]">
            {data &&
                Array.isArray(data) &&
                data.map((word: wordType) => (
                    <div
                        key={word.id}
                        className={` flex w-full  items-center justify-between  bg-muted/60 rounded-xl p-5 gap-5 cursor-pointer   ${!word.learned && "border border-primary"}`}
                        onClick={() => {
                            setIsOpen(true);
                            setSelectedWord(word);
                        }}
                    >
                        <H3>{word.word}</H3>
                        <P>
                            {word.definition.slice(0, 20)}
                            {word.definition.length > 20 && "...."}
                        </P>
                        <div onClick={handleDropDownClick}>
                            <WordDropDown word={word} />
                        </div>
                    </div>
                ))}
            {selectedWord && <WordInfoDialog isOpen={isOpen} onOpenChange={setIsOpen} word={selectedWord} />}
        </div>
    );
}
