import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import { Trash } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import modifier from "@/lib/modifier";
import { mutate } from "swr";

export default function DeleteDialog({ id }: { id: number }) {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        if (user.token) {
            try {
                await modifier.delete("/folders/", user.token, { id: id });
                setIsOpen(false);
                mutate(["/folders", user.token]);
                mutate(["/vocab-list/unfoldered", user.token]);
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
                    <DialogTitle>Delete folder</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this folder?</DialogDescription>
                </DialogHeader>
                <Button variant="outline" onClick={handleDelete}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
