import { Input } from "@/components/shadcn/input";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex items-center w-full">
            <Input placeholder="Search" />
        </div>
    );
}
