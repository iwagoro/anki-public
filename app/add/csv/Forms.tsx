// Forms.tsx
import * as React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table";
import { useSearchParams } from "next/navigation";
import { AuthContext } from "@/provider/AuthProvider";
import modifier from "@/lib/modifier";
import { toast } from "sonner";

type Phrase = {
    word: string;
    definition: string;
};

type FormValues = {
    phrases: Phrase[];
};

interface FormsProps {
    phrases: Phrase[];
}

const Forms: React.FC<FormsProps> = ({ phrases }) => {
    const searchParams = useSearchParams();
    const list_id = searchParams.get("list_id");

    const { user } = React.useContext(AuthContext);
    const { register, handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            phrases: phrases,
        },
    });

    const { fields } = useFieldArray({
        control,
        name: "phrases",
    });

    React.useEffect(() => {
        reset({ phrases });
    }, [phrases]);

    const onSubmit = async (data: { phrases: Phrase[] }) => {
        if (user.token && list_id) {
            modifier
                .post("/word/array/", user.token, { list_id: parseInt(list_id) }, { words: data.phrases })
                .then(() => toast.success("Words added successfully"))
                .catch(() => toast.error("Failed to add words"));
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
};

export default Forms;
