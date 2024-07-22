import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Minus } from "lucide-react";
import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";

type Phrase = {
    word: string;
    definition: string;
};

type FormValues = {
    phrases: Phrase[];
};

type WordsTableProps = {
    fields: any[];
    register: UseFormRegister<FormValues>;
    remove: UseFieldArrayRemove;
};

export default function WordsTable({ fields, register, remove }: WordsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Word</TableHead>
                    <TableHead>Definition</TableHead>
                    <TableHead>Actions</TableHead>
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
                        <TableCell className="w-24">
                            <Button type="button" variant="ghost" onClick={() => remove(index)}>
                                <Minus size={24} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
