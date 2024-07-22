"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/shadcn/sheet";
import { Large } from "@/components/shadcn/typography";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { FileSpreadsheet, FileText } from "lucide-react";
import Link from "next/link";
//! ユーザーのログアウト
export const logOut = async () => {
    auth.signOut()
        .then(() => {
            toast("logged out ");
        })
        .catch((error) => {
            toast("error logging out");
        });
};

export default function Drawer() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu size={24} />
            </SheetTrigger>
            <SheetContent className=" flex flex-col justify-start items-start gap-5">
                <SheetHeader className="flex justify-start">
                    <SheetTitle className="text-left">User detail</SheetTitle>
                    {/* <SheetDescription>{user && user.email}</SheetDescription> */}
                </SheetHeader>
                <SheetClose className="w-full pb-5 border-b-[1px] border-border" asChild>
                    <div
                        className={`flex gap-5 items-center  bg-transparent curosr-pointer  ${theme === "dark" ? "text-white" : "text-black"}`}
                        onClick={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}
                    >
                        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                        <Large>Change Color</Large>
                    </div>
                </SheetClose>
                <SheetClose className="w-full pb-5 border-b-[1px] border-border" asChild>
                    <div
                        className={`flex gap-5 items-center  bg-transparent curosr-pointer`}
                        onClick={() => {
                            logOut();
                            // setUser({} as userType);
                            router.push("/auth");
                        }}
                    >
                        <LogOut size={24} />
                        <Large>Log out</Large>
                    </div>
                </SheetClose>

                <SheetClose className="w-full pb-5 border-b-[1px] border-border" asChild>
                    <Link href="/add-word/?step=0" className={`flex gap-5 items-center  bg-transparent curosr-pointer`}>
                        <FileSpreadsheet size={24} />
                        <Large>Add Word</Large>
                    </Link>
                </SheetClose>
                <SheetClose className="w-full pb-5 border-b-[1px] border-border" asChild>
                    <Link href="/pdf/?step=1" className={`flex gap-5 items-center  bg-transparent curosr-pointer`}>
                        <FileText size={24} />
                        <Large>PDF</Large>
                    </Link>
                </SheetClose>
            </SheetContent>
        </Sheet>
    );
}
