"use client";

import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/shadcn/table";
import { useContext, useState } from "react";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { Checkbox } from "@/components/shadcn/checkbox";
import { AuthContext } from "@/provider/AuthProvider";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import modifier from "@/lib/modifier";
import { mutate } from "swr";
import { useRouter, useSearchParams } from "next/navigation";

export default function SelectVocabList() {
    const [selectedId, setSelectedId] = useState<number | null>(0);
    const [newName, setNewName] = useState("");
    const { user } = useContext(AuthContext);
    const { data: vocabLists, error, isLoading } = useSWR(user.token ? ["/vocab-list/all", user.token] : null, ([url, token]) => fetcher(url, token));
    const router = useRouter(); // useRouterフックの使用
    const params = useSearchParams();
    const currentQuery = Object.fromEntries(params);

    const handleAdd = async () => {
        if (user.token) {
            try {
                await modifier.post("/vocab-list/", user.token, { name: newName });
                mutate(["/vocab-list/all", user.token]);
            } catch (e: any) {}
        }
    };

    const handleRowClick = (id: number) => {
        setSelectedId(id);
        const mergedQuery = { ...currentQuery, ...{ list_id: id.toString() } };
        const queryString = new URLSearchParams(mergedQuery).toString();
        router.push(`?${queryString}`); // URLにlist_idを追加
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row justify-center items-end gap-5">
                <div className="flex-[5]">
                    <Label className="text-md font-bold">Create New</Label>
                    <Input
                        placeholder="Enter list name"
                        className="mt-2"
                        onChange={(e) => {
                            setNewName(e.target.value);
                        }}
                    />
                </div>
                <Button className="flex-[1]" onClick={handleAdd}>
                    Add
                </Button>
            </CardHeader>
            <CardContent>
                <Label className="text-md font-bold">Use already exists</Label>
                <ScrollArea className="w-full max-h-64 h-full mt-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell className="w-5">
                                    <Checkbox disabled />
                                </TableCell>
                                <TableCell className="w-5">ID</TableCell>
                                <TableCell>Vocab List Name</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.isArray(vocabLists) &&
                                vocabLists.map((list) => (
                                    <TableRow key={list.id} onClick={() => handleRowClick(list.id)}>
                                        <TableCell className="w-5">
                                            <Checkbox checked={selectedId === list.id} className="pointer-events-none" />
                                        </TableCell>
                                        <TableCell className="w-5">{list.id}</TableCell>
                                        <TableCell>{list.name}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
