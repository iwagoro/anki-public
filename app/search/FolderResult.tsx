"use client";
import fetcher from "@/lib/fetcher";
import { AuthContext } from "@/provider/AuthProvider";
import React, { useState, useEffect, useContext, ReactNode } from "react";
import useSWR from "swr";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import FolderCard from "@/components/ui/folders/FolderCard";
import { ScrollBar } from "@/components/shadcn/scroll-area";
import { Mute } from "@/components/shadcn/typography";
export default function FolderResult({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const { user } = useContext(AuthContext);
    const target = searchParams.target;
    const [folderCards, setFolders] = useState<ReactNode[]>([
        <Mute key="no content" className="w-full text-center">
            No Contents
        </Mute>,
    ]);
    const { data, error, isLoading } = useSWR(user.token && target ? ["/word/search", target] : null, ([url, searchWord]) => fetcher(url, user.token, { searchWord: searchWord }));

    useEffect(() => {
        if (data && Array.isArray(data?.folders) && data.folders.length > 0) {
            const folders = data.folders;
            const cards = folders?.map((folder: any) => <FolderCard key={folder.id} folder={folder} />);
            setFolders(cards);
        } else {
            setFolders([
                <Mute key="no content" className="w-full text-center">
                    No Contents
                </Mute>,
            ]);
        }
    }, [data]);

    return (
        <ScrollArea className="w-full max-w-3xl overflow-x-auto">
            <div className="flex gap-5">
                {folderCards}
                <ScrollBar orientation="horizontal" />
            </div>
        </ScrollArea>
    );
}
