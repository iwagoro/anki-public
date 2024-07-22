"use client";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/shadcn/card";
import Link from "next/link";
import { Progress } from "@/components/shadcn/progress";
import VocabListDropDown from "./VocabListDropDown";
import { vocabListType } from "@/lib/types";
import Image from "next/image";
import React from "react";

export default function VocabListCard({ list }: { list: vocabListType }) {
    const handleDropDownClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <Link href={{ pathname: "/vocab-list", query: { id: list?.id } }} className="flex items-center w-full h-full ">
            <div className="relative w-24 h-24 aspect-square rounded-xl mr-6">
                <Image src={list.img_url} alt="" layout="fill" className="rounded-3xl object-cover" />
            </div>
            <div className="w-full h-24 flex flex-col gap-2 py-3 mr-6">
                <div className="w-full flex h-full flex-col justify-between">
                    <CardTitle>{list?.name}</CardTitle>
                    <CardDescription>
                        correct: {list?.correct} / total: {list?.len}
                    </CardDescription>
                    <Progress value={(list?.correct / list?.len) * 100} className="h-1" />
                </div>
            </div>

            <div onClick={handleDropDownClick}>
                <VocabListDropDown id={list.id} />
            </div>
        </Link>
    );
}
