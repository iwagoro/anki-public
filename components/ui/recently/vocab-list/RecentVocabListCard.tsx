// components/RecentVocabListCard.tsx
import Link from "next/link";
import Image from "next/image";
import { CardDescription, CardTitle } from "@/components/shadcn/card";
import { vocabListType } from "@/lib/types";
import VocabListDropDown from "../../vocab-list/VocabListDropDown";
import { Progress } from "@/components/shadcn/progress";

interface RecentVocabListCardProps {
    list: vocabListType;
}

export default function RecentVocabListCard({ list }: RecentVocabListCardProps) {
    return (
        <Link href={{ pathname: "/vocab-list", query: { id: list?.id } }} className="flex items-center w-full h-full bg-muted rounded-3xl ">
            <div className="relative w-20 h-20 aspect-square rounded-xl mr-6">
                <Image src={list.img_url} alt="" layout="fill" className="rounded-3xl rounded-r-none object-cover" />
            </div>
            <div className="w-full h-20 flex flex-col gap-2 py-3 mr-6">
                <div className="w-full flex h-full flex-col justify-between">
                    <CardTitle>{list?.name}</CardTitle>
                    <CardDescription>Vocab List</CardDescription>
                </div>
            </div>
        </Link>
    );
}
