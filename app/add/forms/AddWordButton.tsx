import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { UseFieldArrayAppend } from "react-hook-form";
import { FormValues } from "./Forms"; // FormValuesをインポート

type AddWordButtonProps = {
    append: UseFieldArrayAppend<FormValues, "phrases">; // 型を修正
};

export default function AddWordButton({ append }: AddWordButtonProps) {
    return (
        <Button type="button" variant="outline" className="m-4" onClick={() => append({ word: "", definition: "" })}>
            <Plus size={24} />
        </Button>
    );
}
