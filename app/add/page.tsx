"use server";
import SelectVocabList from "./SelectVocabList";
import AddVocabButtons from "../../components/ui/AddVocabButtons";
import { H2 } from "@/components/shadcn/typography";
import { Button } from "@/components/shadcn/button";
import Link from "next/link";

export default async function Add({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
    const method = searchParams.method;
    const listId = searchParams.list_id;

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <H2>Select Method</H2>
            <AddVocabButtons searchParams={searchParams} />
            {method && (
                <>
                    <H2>Select Vocab List</H2>
                    <SelectVocabList />
                    <Link href={`/add/${method}/?list_id=${listId}`} className="w-full">
                        <Button disabled={!listId} className="w-full">
                            Next
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );
}
