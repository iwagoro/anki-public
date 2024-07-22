"use client";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import { signOut } from "@/app/auth/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu";
import { Unlock } from "lucide-react";

export default function UserIcon() {
    const { user } = useContext(AuthContext);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>User Info</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled className="text-xs">
                    {user.email}
                </DropdownMenuItem>

                <DropdownMenuItem disabled className="text-xs">
                    {user.id}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                    <Unlock size={12} className="mr-2" /> sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
