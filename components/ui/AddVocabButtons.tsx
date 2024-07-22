"use server";

import { Button } from "@/components/shadcn/button";
import { Card, CardHeader, CardTitle } from "@/components/shadcn/card";
import { P } from "@/components/shadcn/typography";
import { CodeXml, ScanText, TextCursorInput } from "lucide-react";
import Link from "next/link";

export default async function AddVocabButtons({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const method = searchParams.method || "";
    const listId = searchParams.list_id || "";

    const createLink = (method: string) => {
        return `/add/?method=${method}&list_id=${listId}`;
    };

    return (
        <div className="w-full grid grid-cols-3 gap-5">
            <Link href={createLink("image")}>
                <Button variant="outline" className={(method === "image" && "text-primary") + " " + "w-full h-full flex flex-col border-none"}>
                    <ScanText size={24} />
                    <P>Scan Image</P>
                </Button>
            </Link>
            <Link href={createLink("forms")}>
                <Button variant="outline" className={(method === "forms" && "text-primary") + " " + "w-full h-full flex flex-col border-none"}>
                    <TextCursorInput size={24} />
                    <P>Forms</P>
                </Button>
            </Link>
            <Link href={createLink("csv")}>
                <Button variant="outline" className={(method === "csv" && "text-primary") + " " + "w-full h-full flex flex-col border-none "}>
                    <CodeXml size={24} />
                    <P>Upload CSV</P>
                </Button>
            </Link>
        </div>
    );
}
