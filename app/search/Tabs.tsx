import { Tabs as TabsComponent, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import Link from "next/link";

export default async function Tabs({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const target = searchParams.target;
    return (
        <TabsComponent defaultValue="">
            <TabsList>
                <Link href={`/search?target=${target}`}>
                    <TabsTrigger value="">All</TabsTrigger>
                </Link>
                <Link href={`/search?focus=folder&target=${target}`}>
                    <TabsTrigger value="folder">Folder</TabsTrigger>
                </Link>
                <Link href={`/search?focus=vocab-list&target=${target}`}>
                    <TabsTrigger value="vocab-list">Vocab List</TabsTrigger>
                </Link>
                <Link href={`/search?focus=word&target=${target}`}>
                    <TabsTrigger value="word">Word</TabsTrigger>
                </Link>
                <Link href={`/search?focus=dictionary&target=${target}`}>
                    <TabsTrigger value="dictionary">Dictionary</TabsTrigger>
                </Link>
            </TabsList>
        </TabsComponent>
    );
}
