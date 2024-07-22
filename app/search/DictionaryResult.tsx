"use client";
import { List, Mute, P } from "@/components/shadcn/typography";
import useSWR from "swr";
import axios from "axios";
import AddDialog from "./AddDialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";

const fetcher = async (url: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_ROUTE_HANDLER_URL;
    const res = await axios.get(`${baseUrl}/word-info`, { params: { word: url } });
    return res.data;
};

export default function DictionaryResult({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const target = searchParams.target;

    const { data, error, isLoading } = useSWR(target ? target : null, fetcher);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    if (!data || !Array.isArray(data)) {
        return <Mute className="w-full text-center">No Contents</Mute>;
    }

    return (
        <div className="w-full flex flex-col items-center gap-4">
            {data.map((item: any, index: number) => (
                <Card key={index} className="w-full max-w-3xl justify-center border-none bg-muted/60">
                    <CardHeader className="w-full text-center">
                        <CardTitle>
                            {item.word} 【{Array.isArray(item.meanings) && item.meanings[0]?.partOfSpeech}】
                        </CardTitle>
                        <CardDescription>{item.phonetic}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Mute className="w-full text-left">meanings</Mute>
                        <List className="mt-0">
                            {Array.isArray(item.meanings[0]?.definitions) &&
                                item.meanings[0].definitions.map((definition: any, index: number) => (
                                    <li key={index} className="text-left">
                                        {definition.definition}
                                    </li>
                                ))}
                        </List>
                        <Mute className="w-full text-left">synonyms</Mute>
                        <List className="mt-0">
                            {Array.isArray(item.meanings[0]?.synonyms) &&
                                item.meanings[0].synonyms.map((synonym: any, index: number) => (
                                    <li key={index} className="text-left">
                                        {synonym}
                                    </li>
                                ))}
                        </List>
                        <Mute className="w-full text-left">source link</Mute>
                        <List className="mt-0">
                            {Array.isArray(item.sourceUrls) &&
                                item.sourceUrls.map((sourceUrl: any, index: number) => (
                                    <li key={index} className="text-left">
                                        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                                            {sourceUrl}
                                        </a>
                                    </li>
                                ))}
                        </List>
                    </CardContent>
                    <CardFooter>
                        <AddDialog word={{ word: item.word, definition: "" }} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
