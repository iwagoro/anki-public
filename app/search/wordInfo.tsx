"use client";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/shadcn/drawer";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { List, Mute } from "@/components/shadcn/typography";
import AddDialog from "./AddDialog";

const fetcher = async (url: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_ROUTE_HANDLER_URL;
    const res = await axios.get(`${baseUrl}/word-info`, { params: { word: url } });
    return res.data;
};

export default function WordInfo({ children, word }: { children: any; word: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, error, isLoading } = useSWR(isOpen && word ? [word.word] : null, ([url]) => fetcher(url));

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="w-full flex justify-center items-center">
                <div className="w-full max-w-3xl justify-center">
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl">
                            {word.word} 【{data && Array.isArray(data[0].meanings) && data[0].meanings[0].partOfSpeech}】
                        </DrawerTitle>
                        <DrawerDescription>{data && data[0].phonetic}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="gap-1">
                        <Mute className="w-full text-left">meanings you added</Mute>
                        <List className="mt-0">{word.definition}</List>
                    </DrawerFooter>
                    <DrawerFooter className="gap-1">
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
                    </DrawerFooter>
                    <DrawerFooter className="w-full flex justify-center">
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
                    </DrawerFooter>
                    <DrawerFooter className="w-full flex justify-center">
                        {data && Array.isArray(data[0].sourceUrls) && data[0].sourceUrls.length > 0 && <Mute className="w-full text-left">source urls</Mute>}
                        <List className="mt-0">
                            {data &&
                                Array.isArray(data[0].sourceUrls) &&
                                data[0].sourceUrls.map((sourceUrl: any, index: number) => (
                                    <li key={index} className="text-left">
                                        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                                            {sourceUrl}
                                        </a>
                                    </li>
                                ))}
                        </List>
                    </DrawerFooter>

                    <DrawerFooter className="w-full flex justify-center">
                        <AddDialog word={{ word: word.word, definition: word.definition ? word.definition : "" }} />
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
