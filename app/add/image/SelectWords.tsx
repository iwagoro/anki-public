"use client";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button } from "@/components/shadcn/button";
import { AuthContext } from "@/provider/AuthProvider";
import { toast } from "sonner";
import modifier from "@/lib/modifier";
export default function SelectWords({ sentence, setPhrases }: { sentence: string; setPhrases: Function }) {
    const { user } = useContext(AuthContext);
    const [words, setWords] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [selectedWordIndex, setSelectedWordIndex] = useState<boolean[]>(Array(words.length).fill(false));

    const getWordMeaning = async () => {
        if (user.token) {
            const request = {
                sentence: sentence,
                phrases: selectedWords,
            };

            modifier.post("/word/meaning", user.token, {}, request).then((res) => {
                setPhrases(res);
            });
        }
    };

    //! 選択された単語を取得
    const makeWordSets = () => {
        const result = [];
        let streak = 0;
        for (let i = 0; i <= words.length; i++) {
            if (selectedWordIndex[i]) {
                streak++;
            } else {
                if (streak) result.push(words.slice(i - streak, i).join(" "));
                streak = 0;
            }
        }
        setSelectedWords(result);
    };

    const onSubmit = async () => {
        try {
            setPhrases([]);
            makeWordSets();
            getWordMeaning();
        } catch {
            toast.error("Failed to extract text from image");
        }
    };

    useEffect(() => {
        sentence !== "" && setWords(sentence.split(" "));
    }, [sentence]);

    return (
        <>
            <div className="w-full flex flex-col justify-start items-start gap-5">
                <div className="w-full flex flex-col justify-start items-start gap-5">
                    <p className="text-2xl font-bold">Extracted Sentences</p>
                    <div className="flex flex-wrap">
                        {words.length !== 0 &&
                            words.map((word, index) => (
                                <span
                                    key={index}
                                    className={`px-1 py-1 my-1 rounded-md cursor-pointer font-normal text-xl
                                  ${selectedWordIndex[index + 1] && "rounded-r-none "} 
                                  ${selectedWordIndex[index - 1] && "rounded-l-none "}  
                                  ${selectedWordIndex[index] && "bg-primary "}`}
                                    onClick={() =>
                                        setSelectedWordIndex((prev) => {
                                            const copy = [...prev];
                                            copy[index] = !copy[index];
                                            return copy;
                                        })
                                    }
                                >
                                    {word}
                                </span>
                            ))}
                    </div>
                    <Button className="w-full text-xl font-semibold onClick=" onClick={onSubmit}>
                        create Vocab List!
                    </Button>
                </div>
            </div>
        </>
    );
}
