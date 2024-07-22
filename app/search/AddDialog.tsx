import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/shadcn/dialog";
import { Table, TableBody, TableCell, TableRow, TableHeader } from "@/components/shadcn/table";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Button } from "@/components/shadcn/button";
import { useContext, useState, useCallback } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { toast } from "sonner";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import modifier from "@/lib/modifier";

export default function AddDialog({ word }: { word: { word: string; definition: string } }) {
    const [selectedId, setSelectedId] = useState<number>();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const { data: folders } = useSWR(user.token ? ["/vocab-list/all", user.token] : null, ([url, token]) => fetcher(url, token));

    const handleMove = async () => {
        if (user.token) {
            try {
                await modifier.post("/word/", user.token, { list_id: selectedId }, { word: word.word, definition: word.definition });
                setIsOpen(false); // Close the dialog on success
                toast.success("word added successfully");
            } catch (e) {
                toast.error("Failed to add to list");
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add to Vocab List</Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl">
                <DialogHeader className="gap-4">
                    <DialogTitle>Move to Folder</DialogTitle>
                    <DialogDescription>Select folders</DialogDescription>
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Folder Name</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(folders) &&
                            folders.map((folder: any) => (
                                <TableRow
                                    key={folder.id}
                                    onClick={() => {
                                        selectedId === folder.id ? setSelectedId(0) : setSelectedId(folder.id);
                                    }}
                                >
                                    <TableCell>
                                        <div className="w-full flex items-center space-x-2">
                                            <Checkbox checked={selectedId === folder.id} />
                                            <label className="w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{folder.name}</label>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">{folder.len}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Button variant="outline" onClick={handleMove}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
