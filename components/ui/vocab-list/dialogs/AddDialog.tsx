import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import modifier from "@/lib/modifier";
import { useContext, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { mutate } from "swr";
import { useSearchParams } from "next/navigation";

export default function AddDialog() {
    const { user } = useContext(AuthContext);
    const [newName, setNewName] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const params = useSearchParams();
    const folderId = params.get("id");

    const handleAdd = async () => {
        if (user.token) {
            try {
                if (folderId) {
                    await modifier.post("/vocab-list/", user.token, { name: newName, id: folderId });
                    mutate([`/vocab-list/folder/?id=${folderId}`, user.token]);
                } else {
                    await modifier.post("/vocab-list/", user.token, { name: newName });
                    mutate(["/vocab-list/unfoldered", user.token]);
                }
                setIsOpen(false);
            } catch (e: any) {}
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Plus size={18} />
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl">
                <DialogHeader className="gap-4">
                    <DialogTitle>Enter vocab list name</DialogTitle>
                    <Input placeholder="folder name" onChange={(e: any) => setNewName(e.target.value)} />
                </DialogHeader>
                <Button variant="outline" onClick={handleAdd}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
