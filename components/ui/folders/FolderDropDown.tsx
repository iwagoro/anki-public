import { Button } from "@/components/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu";
import { EllipsisVertical, Pencil } from "lucide-react";
import EditDialog from "./dialogs/EditDialog";
import DeleteDialog from "./dialogs/DeleteDialog";
import { useState } from "react";

export default function FolderDialog({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-fit h-fit p-3 rounded-xl ml-auto">
                    <EllipsisVertical size={18} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Config</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        setIsEditDialogOpen(true);
                    }}
                >
                    <Pencil size={14} className="mr-2" />
                    Edit
                </DropdownMenuItem>
                <DeleteDialog id={id} />
            </DropdownMenuContent>
            <EditDialog id={id} isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
        </DropdownMenu>
    );
}
