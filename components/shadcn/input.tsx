import * as React from "react";
import { cn } from "@/lib/utils";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAttach } from "react-icons/io";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    iconType?: "search" | "attach"; // iconType propsを追加
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", iconType, ...props }, ref) => {
    return (
        <div className="relative w-full">
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
            {iconType === "search" && <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />}
            {iconType === "attach" && <IoMdAttach size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />}
        </div>
    );
});

Input.displayName = "Input";

export { Input };
