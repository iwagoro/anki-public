"use client";
import { Button } from "@/components/shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import modifier from "@/lib/modifier";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { mutate } from "swr";
import { useSearchParams } from "next/navigation";
import { wordType } from "@/lib/types";
import { toast } from "sonner";

interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    word: wordType;
}

export default function EditDialog({ word, isOpen, onOpenChange }: EditDialogProps) {
    const { user } = useContext(AuthContext);

    const wordInputRef = useRef<HTMLInputElement>(null);
    const params = useSearchParams();
    const listId = params.get("id");
    const [newWord, setNewWord] = useState(word.word);
    const [newDefinition, setNewDefinition] = useState(word.definition);

    const handleEdit = async () => {
        if (user.token) {
            try {
                if (newWord === "" || newDefinition === "") return;
                await modifier.put("/word/", user.token, { id: word.id }, { word: newWord, definition: newDefinition });
                mutate([`/vocab-list/?id=${listId}`, user.token]);
                onOpenChange(false);
                toast.success("word updated successfully");
            } catch (e: any) {
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
                <Input ref={wordInputRef} placeholder="word" defaultValue={word.word} onChange={(e) => setNewWord(e.target.value)} />
                <Input placeholder="definition" defaultValue={word.definition} onChange={(e) => setNewDefinition(e.target.value)} />
                <Button variant="outline" onClick={handleEdit}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
