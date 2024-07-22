"use client";
import { Input } from "@/components/shadcn/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function SearchInput() {
    const [searchWord, setSearchWord] = useState("");
    const [debouncedSearchWord, setDebouncedSearchWord] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchWord(searchWord);
        }, 300); // 300ミリ秒のデバウンス時間

        // クリーンアップ関数を設定して、次の入力が発生した場合に前のタイムアウトをクリアします
        return () => {
            clearTimeout(handler);
        };
    }, [searchWord]);

    useEffect(() => {
        if (debouncedSearchWord) {
            router.push(`/search?target=${debouncedSearchWord}`);
        } else {
            router.push(`/search`);
        }
    }, [debouncedSearchWord]);

    return <Input iconType="search" placeholder="Search" onChange={(e) => setSearchWord(e.target.value || "")} />;
}
