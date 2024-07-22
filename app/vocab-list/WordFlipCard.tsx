"use client";
import React, { useState, useContext, useEffect } from "react";
import { Card } from "@/components/shadcn/card";
import { H2, P } from "@/components/shadcn/typography";
import ReactCardFlip from "react-card-flip";
import { Button } from "@/components/shadcn/button";
import { X, Check, ChevronRight, ChevronLeft, Save, ArrowDownToLine } from "lucide-react";
import { Progress } from "@/components/shadcn/progress";
import { Label } from "@/components/shadcn/label";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { AuthContext } from "@/provider/AuthProvider";
import { useSearchParams } from "next/navigation";
import useWord from "./useWord";

export default function WordFlipCard() {
    const { user } = useContext(AuthContext);
    const { addWords, updateState } = useWord();
    const params = useSearchParams();
    const listId = params.get("id");
    const { data } = useSWR(user.token && listId ? [`/vocab-list/?id=${listId}`, user.token] : null, ([url, token]) => fetcher(url, token));
    const words = data || [];

    const [isFlipped, setIsFlipped] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (words) {
            addWords(words);
        }
    }, [words]);

    const nextPage = () => {
        if (index < words.length - 1) {
            setIsShow(false);
            setIndex(index + 1);

            setTimeout(() => setIsShow(true), 500);
        }
    };

    const prevPage = () => {
        if (index > 0) {
            setIsShow(false);
            setIndex(index - 1);
            setTimeout(() => setIsShow(true), 500);
        }
    };

    const handleCollect = async (wordId: number, isCollect: boolean) => {
        if (isCollect) {
            updateState(wordId, true);
            nextPage();
        } else {
            updateState(wordId, false);
            nextPage();
        }
    };

    return (
        <div className="w-full h-full flex flex-col px-5  gap-10">
            <div className="w-full h-fit flex flex-col gap-5">
                <Progress value={((index + 1) * 100) / words.length} />
                <Label className="w-full text-center">
                    {index + 1}/{words.length}
                </Label>
            </div>
            <div className="w-full flex-1">
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerStyle={{ height: "100%", width: "100%" }}>
                    <Card className={`flex flex-col items-center justify-center w-full p-10  h-full`} onClick={() => setIsFlipped((prev) => !prev)}>
                        <H2>{words[index]?.word || "Nan"}</H2>
                    </Card>
                    <Card className={`flex flex-col items-center justify-center w-full p-10  h-full`} onClick={() => setIsFlipped((prev) => !prev)}>
                        {isShow && <P>{words[index]?.definition || "Nan"}</P>}
                    </Card>
                </ReactCardFlip>
            </div>

            <div className="w-full h-fit flex flex-col gap-5">
                <div className="w-full flex items-center gap-5">
                    <Button className="w-full py-8" variant="outline" onClick={() => handleCollect(words[index].id, false)}>
                        <X size={24} className="text-primary" />
                    </Button>
                    <Button className="w-full py-8" variant="outline" onClick={() => handleCollect(words[index].id, true)}>
                        <Check size={24} className="text-[limegreen]" />
                    </Button>
                </div>
                <div className="flex justify-between items-center gap-5">
                    <Button
                        variant="outline"
                        className="py-8"
                        onClick={() => {
                            setIsFlipped(false);
                            prevPage();
                        }}
                    >
                        <ChevronLeft size={32} />
                    </Button>
                    <Button
                        variant="outline"
                        className="py-8"
                        onClick={() => {
                            setIsFlipped(false);
                            nextPage();
                        }}
                    >
                        <ChevronRight size={32} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
