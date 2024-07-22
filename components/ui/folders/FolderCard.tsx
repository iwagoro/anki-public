import { CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import Link from "next/link";
import FolderDialog from "./FolderDropDown";
import Image from "next/image";

export default function FolderCard({ folder }: { folder: any }) {
    return (
        <div className="w-fit rounded-md">
            <Link href={{ pathname: "/folder", query: { id: folder.id } }}>
                <div className="relative w-48 h-48 rounded-3xl border border-border">
                    <Image src={folder.img_url} alt="" layout="fill" className="rounded-3xl object-cover" />
                </div>
            </Link>
            <div className="flex justify-between items-center p-2">
                <div className="flex-col">
                    <CardTitle className="flex text-lg">{folder?.name}</CardTitle>
                    <CardDescription>total: {folder?.len}</CardDescription>
                </div>
                <FolderDialog id={folder.id} />
            </div>
        </div>
    );
}
