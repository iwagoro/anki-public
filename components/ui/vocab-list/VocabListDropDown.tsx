// components/VocabListDropDown.tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import { Ellipsis, Pencil } from "lucide-react";
import EditDialog from "./dialogs/EditDialog";
import DeleteDialog from "./dialogs/DeleteDialog";
import MoveDialog from "./dialogs/MoveDialog";
import { useState } from "react";

export default function VocabListDropDown({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-fit h-fit p-3 rounded-xl ml-auto">
                        <Ellipsis size={20} />
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
                    <MoveDialog id={id} />
                </DropdownMenuContent>
            </DropdownMenu>
            <EditDialog id={id} isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
        </>
    );
}
