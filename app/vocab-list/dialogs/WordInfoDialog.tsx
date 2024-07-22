import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/shadcn/dialog";
import { useSearchParams } from "next/navigation";
import { DialogDescription } from "@radix-ui/react-dialog";
import { wordType } from "@/lib/types";
import useSWR from "swr";
import axios from "axios";
import { List, Mute } from "@/components/shadcn/typography";
interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    word: wordType;
}

const fetcher = async (url: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_ROUTE_HANDLER_URL;
    const res = await axios.get(`${baseUrl}/word-info`, { params: { word: url } });
    return res.data;
};

export default function WordInfoDialog({ isOpen, onOpenChange, word }: EditDialogProps) {
    const params = useSearchParams();

    const { data, error, isLoading } = useSWR(isOpen && word ? [word.word] : null, ([url]) => fetcher(url));

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-xl max-h-[80vh] overflow-y-scroll">
                <DialogHeader className="gap-4">
                    <DialogTitle className="text-2xl">{word.word}</DialogTitle>
                    <DialogDescription>{word.definition}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="w-full flex justify-center">
                    {data && Array.isArray(data[0].meanings[0].definitions) && data[0].meanings[0].definitions.length > 0 && <Mute className="w-full text-left">meanings</Mute>}
                    <List className="mt-0">
                        {data &&
                            Array.isArray(data[0].meanings[0].definitions) &&
                            data[0].meanings[0].definitions.map((definition: any, index: number) => (
                                <li key={index} className="text-left">
                                    {definition.definition}
                                </li>
                            ))}
                    </List>
                </DialogFooter>
                <DialogFooter className="w-full flex justify-center">
                    {data && Array.isArray(data[0].meanings[0].synonyms) && data[0].meanings[0].synonyms.length > 0 && <Mute className="w-full text-left">synonyms</Mute>}
                    <List className="mt-0">
                        {data &&
                            Array.isArray(data[0].meanings[0].synonyms) &&
                            data[0].meanings[0].synonyms.map((synonym: any, index: number) => (
                                <li key={index} className="text-left">
                                    {synonym}
                                </li>
                            ))}
                    </List>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
