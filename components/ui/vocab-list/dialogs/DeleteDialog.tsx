import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import { Trash } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { mutate } from "swr";
import modifier from "@/lib/modifier";

export default function DeleteDialog({ id }: { id: number }) {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        if (user.token) {
            try {
                await modifier.delete("/vocab-list/", user.token, { id: id });
                setIsOpen(false); // Close the dialog on success
                toast.success("List deleted successfully");
                mutate(["/vocab-list/unfoldered", user.token]); // Adjust key based on your useSWR configuration
            } catch (e) {
                toast.error("Failed to delete list");
            }
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
            <DialogContent>
                <DialogHeader className="gap-4">
                    <DialogTitle>Delete List</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this list?</DialogDescription>
                </DialogHeader>
                <Button variant="outline" onClick={handleDelete}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
