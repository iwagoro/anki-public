import { Button } from "@/components/shadcn/button";
import { Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog";
import modifier from "@/lib/modifier";
import { useContext, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { mutate } from "swr";
import { useSearchParams } from "next/navigation";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function Deleteialog({ word }: { word: any }) {
    const params = useSearchParams();
    const listId = params.get("id");
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        if (user.token) {
            try {
                await modifier.delete("/word/", user.token, { id: word.id });
                setIsOpen(false);
                mutate([`/vocab-list/?id=${listId}`, user.token]);
            } catch (e: any) {}
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-[7px]">
                    <Trash size={14} className="mr-2" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl">
                <DialogHeader className="gap-4">
                    <DialogTitle>Delete : {word.word}</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this word?</DialogDescription>
                </DialogHeader>
                <Button variant="outline" onClick={handleDelete}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
