"use client";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import modifier from "@/lib/modifier";
import { toast } from "sonner";

export default function useWord() {
    const [savedWords, setSavedWords] = useState<{ id: number; word: string; definition: string; learned: boolean | null }[]>([]);
    const { user } = useContext(AuthContext);

    //! ローカルストレージから単語を取得
    useEffect(() => {
        const words = localStorage.getItem("words");
        if (words) {
            setSavedWords(JSON.parse(words));
        }
    }, []);

    //! 初回時に単語をlearned:nullでlocalstorageに保存
    const addWords = useCallback((items: { id: number; word: string; definition: string; learned: boolean }[]) => {
        // console.log(items);
        const newWords = items.map((item) => ({ ...item, learned: null }));
        setSavedWords(newWords);
    }, []);

    //! 単語のlearnedの更新
    const updateState = useCallback(
        (id: number, learned: boolean) => {
            const newWords = savedWords.map((item) => {
                if (item.id === id) {
                    return { ...item, learned };
                } else {
                    return item;
                }
            });
            localStorage.setItem("words", JSON.stringify(newWords));
            setSavedWords(newWords);
        },
        [savedWords]
    );

    //! 変更をDBに反映する
    const applyUpdate = async () => {
        if (!user.token) return;

        const savedWords = JSON.parse(localStorage.getItem("words") || "[]");

        if (savedWords.length === 0) return;
        const newWords = savedWords.map((item: any) => {
            return { id: item.id, learned: item.learned };
        });
        modifier
            .put("/word", user.token, {}, { words: newWords })
            .then((res) => {
                localStorage.removeItem("words");
                setSavedWords([]);
            })
            .catch((err) => {
                toast.error("Failed to update words");
            });
    };

    return { savedWords, addWords, updateState, applyUpdate };
}
