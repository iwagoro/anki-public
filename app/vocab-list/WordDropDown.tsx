import { Button } from "@/components/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu";
import { EllipsisVertical, Pencil } from "lucide-react";
import EditDialog from "./dialogs/EditDialog";
import DeleteDialog from "./dialogs/DeleteDialog";
import { useState } from "react";
import { wordType } from "@/lib/types";

export default function WordDropDown({ word }: { word: wordType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-fit h-fit p-3 rounded-xl ml-auto">
                        <EllipsisVertical size={12} />
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
                    <DeleteDialog word={word} />
                </DropdownMenuContent>
            </DropdownMenu>

            <EditDialog word={word} isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
        </>
    );
}
