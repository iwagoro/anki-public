import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Pencil } from "lucide-react";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import modifier from "@/lib/modifier";
import { mutate } from "swr";
import { toast } from "sonner";

interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    id: number;
}

export default function EditDialog({ isOpen, onOpenChange, id }: EditDialogProps) {
    const wordInputRef = useRef<HTMLInputElement>(null);
    const [newName, setNewName] = useState("");
    const { user } = useContext(AuthContext);

    const handleEdit = async () => {
        if (user.token) {
            try {
                await modifier.put("/folders/", user.token, { id: id, new_name: newName });
                toast.success("List name updated successfully");
                mutate(["/folders", user.token]);
                onOpenChange(false);
            } catch (e: any) {
                toast.error("Failed to edit list");
            }
        }
    };

    useEffect(() => {
        if (isOpen && wordInputRef.current) {
            setTimeout(() => {
                wordInputRef.current?.focus();
            }, 100); // Adding a slight delay to ensure the dialog is fully opened
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-xl">
                <DialogHeader className="gap-4">
                    <DialogTitle>Enter folder name</DialogTitle>
                    <Input ref={wordInputRef} placeholder="folder name" onChange={(e: any) => setNewName(e.target.value)} />
                </DialogHeader>
                <Button variant="outline" onClick={handleEdit}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
