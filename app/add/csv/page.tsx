// Page.tsx
"use client";

import { Suspense, useContext, useState } from "react";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import Forms from "./Forms"; // Formsコンポーネントをインポート

type Phrase = {
    word: string;
    definition: string;
};

export default function Page() {
    const [file, setFile] = useState<FileList | null>(null);
    const [phrases, setPhrases] = useState<Phrase[]>([]);

    const onUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const csv = reader.result as string;
                const lines = csv.split("\n");
                const words = lines
                    .slice(1)
                    .map((line) => {
                        const [word, definition] = line.split(",");
                        if (word === "" || undefined || definition === "" || undefined) return;
                        return { word, definition };
                    })
                    .filter(Boolean) as Phrase[];
                console.log(words);
                setPhrases(words);
            };

            reader.readAsText(file[0]);
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Upload CSV</CardTitle>
                    <CardDescription>Upload a CSV file to add words</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label className="text-md font-bold">Create New</Label>
                    <Input type="file" accept=".csv" className="mt-2" onChange={(e) => setFile(e.target.files)} />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={!file} onClick={onUpload}>
                        Upload
                    </Button>
                </CardFooter>
            </Card>
            <Suspense fallback={<div>loading...</div>}>
                <Forms phrases={phrases} />
            </Suspense>
        </div>
    );
}
