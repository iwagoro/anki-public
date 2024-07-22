"use client";

import { Suspense, useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import SelectWords from "./SelectWords";
import Forms from "./Forms";

type Phrase = {
    word: string;
    definition: string;
};

export default function Home() {
    const [sentence, setSentence] = useState("");
    const [phrases, setPhrases] = useState<Phrase[]>([]);

    useEffect(() => {
        console.log(phrases);
    }, [phrases]);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <UploadImage setSentence={setSentence} />
            {sentence && <SelectWords sentence={sentence} setPhrases={setPhrases} />}
            <Suspense fallback={<div>loading...</div>}>{phrases && <Forms phrases={phrases} />}</Suspense>
        </div>
    );
}
