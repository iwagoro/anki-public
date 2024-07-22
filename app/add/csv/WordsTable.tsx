import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table";
import { Input } from "@/components/shadcn/input";
import { UseFormRegister } from "react-hook-form";
type Phrase = {
    word: string;
    definition: string;
};
type FormValues = {
    phrases: Phrase[];
};
type WordsTableProps = {
    fields: any[];
    register: UseFormRegister<FormValues>; // 型を修正
};

export default function WordsTable({ fields, register }: WordsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Word</TableHead>
                    <TableHead>Definition</TableHead>
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
    );
}
