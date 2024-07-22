"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useContext } from "react";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table";
import { Input } from "@/components/shadcn/input";
import { AuthContext } from "@/provider/AuthProvider";
import { useSearchParams } from "next/navigation";
import modifier from "@/lib/modifier";
import { toast } from "sonner";

type Phrase = {
    word: string;
    definition: string;
};

type FormValues = {
    phrases: Phrase[];
};

export default function Forms({ phrases }: { phrases: Phrase[] }) {
    const { user } = useContext(AuthContext);
    const params = useSearchParams();
    const listId = params.get("list_id");

    const { register, handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            phrases: phrases,
        },
    });

    const { fields } = useFieldArray({
        control,
        name: "phrases",
    });

    useEffect(() => {
        console.log(phrases);
        reset({ phrases: phrases });
    }, [phrases]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (user.token && listId) {
            modifier.post("/word/array/", user.token, { list_id: parseInt(listId) }, { words: data.phrases }).then((res) => {
                toast.success("Words added successfully");
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
            {fields.length > 0 && (
                <>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Words</CardTitle>
                            <CardDescription>Words to be added</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>word</TableHead>
                                        <TableHead>definition</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fields.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Input type="text" className="w-full" {...register(`phrases.${index}.word` as const)} defaultValue={item.word} />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" className="w-full" {...register(`phrases.${index}.definition` as const)} defaultValue={item.definition} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Button type="submit">Finish</Button>
                </>
            )}
        </form>
    );
}
