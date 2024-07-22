"use client";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext, useEffect } from "react";
import { Plus, Home, Search } from "lucide-react";
import Link from "next/link";
import UserIcon from "./UserIcon";

export default function BottomBar() {
    const { user } = useContext(AuthContext);

    return (
        <div className="absolute bottom-0 z-50 max-w-3xl w-full h-[50px] flex justify-center px-10 items-center  bg-background  ">
            {user.token && (
                <div className="w-full h-full flex justify-between items-center gap-10">
                    <Link href="/add">
                        <Plus size={18} />
                    </Link>
                    <Link href="/home">
                        <Home size={18} />
                    </Link>
                    <Link href="/search">
                        <Search size={18} />
                    </Link>
                    <UserIcon />
                </div>
            )}
        </div>
    );
}
