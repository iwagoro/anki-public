// FileUpload.tsx
import * as React from "react";
import { useState } from "react";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
type Phrase = {
    word: string;
    definition: string;
};

interface FileUploadProps {
    onUpload: (words: Phrase[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
    const [file, setFile] = useState<FileList | null>(null);

    const handleUpload = () => {
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
                onUpload(words); // 親コンポーネントにアップロード結果を渡す
            };

            reader.readAsText(file[0]);
        }
    };

    return (
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
                <Button className="w-full" disabled={!file} onClick={handleUpload}>
                    Upload
                </Button>
            </CardFooter>
        </Card>
    );
};

export default FileUpload;
