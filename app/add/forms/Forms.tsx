"use client";

import { useContext } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { AuthContext } from "@/provider/AuthProvider";
import modifier from "@/lib/modifier";
import WordsTable from "./WordsTable";
import { Plus } from "lucide-react";

type Phrase = {
    word: string;
    definition: string;
};

export type FormValues = {
    phrases: Phrase[];
};

export default function Forms() {
    const { user } = useContext(AuthContext);
    const searchParams = useSearchParams();
    const list_id = searchParams.get("list_id");

    const { register, handleSubmit, control } = useForm<FormValues>({
        defaultValues: {
            phrases: [{ word: "", definition: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "phrases",
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (user.token && list_id) {
            await modifier.post("/word/array", user.token, { list_id: parseInt(list_id) }, { words: data.phrases });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Words</CardTitle>
                    <CardDescription>Words to be added</CardDescription>
                </CardHeader>
                <CardContent>
                    <WordsTable fields={fields} register={register} remove={remove} />
                </CardContent>
                <CardFooter>
                    <Button type="button" variant="outline" className="m-4" onClick={() => append({ word: "", definition: "" })}>
                        <Plus size={24} />
                    </Button>
                </CardFooter>
            </Card>
            <Button type="submit">Finish</Button>
        </form>
    );
}
