// components/dialogs/EditDialog.tsx
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { useRef, useEffect, useState, useContext } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import modifier from "@/lib/modifier";
import { AuthContext } from "@/provider/AuthProvider";

interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    id: number;
}

export default function EditDialog({ isOpen, onOpenChange, id }: EditDialogProps) {
    const wordInputRef = useRef<HTMLInputElement>(null);
    const { user } = useContext(AuthContext);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        if (isOpen && wordInputRef.current) {
            setTimeout(() => {
                wordInputRef.current?.focus();
            }, 100); // Adding a slight delay to ensure the dialog is fully opened
        }
    }, [isOpen]);

    const handleEdit = async () => {
        if (user.token) {
            try {
                await modifier.put("/vocab-list/", user.token, { id: id, new_name: newName });
                onOpenChange(false);
                toast.success("List name updated successfully");
                mutate(["/vocab-list/unfoldered", user.token]);

                onOpenChange(false);
            } catch (e) {
                toast.error("Failed to edit list");
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="gap-4">
                    <DialogTitle>Edit List</DialogTitle>
                    <DialogDescription>Enter the new name for the list</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Input ref={wordInputRef} placeholder="word" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </DialogFooter>
                <Button variant="outline" onClick={handleEdit}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
