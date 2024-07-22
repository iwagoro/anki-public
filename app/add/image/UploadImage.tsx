"use client";

import { useContext, useState } from "react";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { AuthContext } from "@/provider/AuthProvider";
import { toast } from "sonner";
import modifier from "@/lib/modifier";

export default function UploadImage({ setSentence }: { setSentence: Function }) {
    const [file, setFile] = useState<FileList | null>(null);
    const { user } = useContext(AuthContext);

    const onUpload = () => {
        if (file) {
            modifier
                .post("/word/image", user.token, {}, { file: file[0] }, "multipart/form-data")
                .then((sentence) => {
                    setSentence(sentence);
                })
                .catch((e) => {
                    toast.error("Failed to extract text from image");
                });
        }
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Upload Image</CardTitle>
                    <CardDescription>Upload an image file to add words</CardDescription>
                    <CardDescription>.jpeg .jpg .png files are supported</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label className="text-md font-bold">Create New</Label>
                    <Input iconType="attach" type="file" accept=".jpeg,.jpg,.png" className="mt-2" onChange={(e) => setFile(e.target.files)} />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={!file} onClick={onUpload}>
                        Upload
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
