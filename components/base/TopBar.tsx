"use client";
import Link from "next/link";
import ModeToggle from "@/components/base/ThemeToggle";
import SearchBar from "@/components/base/SearchBar";
export default function TopBar() {
    return (
        <div className="absolute top-0 z-50 max-w-3xl w-full h-[50px] flex justify-center px-5 items-center  bg-background  ">
            <div className="w-full h-full flex justify-between items-center gap-10">
                <Link href="/">
                    <div className="flex items-center">
                        <h2 className="scroll-m-20  text-[24px] font-semibold tracking-tight first:mt-0">Anki</h2>
                    </div>
                </Link>
                <ModeToggle />
            </div>
        </div>
    );
}
