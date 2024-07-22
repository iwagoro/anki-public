"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import FolderCard from "./FolderCard";
import { folderType } from "@/lib/types";
import { AuthContext } from "@/provider/AuthProvider";
import { Skeleton } from "@/components/shadcn/skeleton";
import AddDialog from "./dialogs/AddDialog";

import fetcher from "@/lib/fetcher";
import { H4, Mute } from "@/components/shadcn/typography";
import { ScrollArea, ScrollBar } from "@/components/shadcn/scroll-area";

export default function Folders() {
    const { user } = useContext(AuthContext);
    const { data: folders, error, isLoading } = useSWR(user.token ? ["/folders", user.token] : null, ([url, token]) => fetcher(url, token));
    const [folderCards, setFolderCards] = useState<ReactNode[]>([<Skeleton key="loading" className="w-full h-20" />]);

    useEffect(() => {
        if (Array.isArray(folders) && folders.length > 0) {
            const cards = folders.map((folder: folderType) => <FolderCard key={folder.id} folder={folder} />);
            setFolderCards(cards);
        } else {
            setFolderCards([
                <Mute key="no content" className="w-full text-center">
                    No Contents
                </Mute>,
            ]);
        }
    }, [folders]);

    return (
        <div className="w-full">
            <div className="w-full flex justify-between">
                <H4 className="mb-5">Folder</H4>
                <AddDialog />
            </div>
            <ScrollArea className="max-w-3xl overflow-x-auto">
                <div className="flex gap-5">{folderCards}</div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
