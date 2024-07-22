import { Suspense } from "react";
import Forms from "./Forms";
export default async function Page() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-8">
            <Suspense fallback={<div>Loading...</div>}>
                <Forms></Forms>
            </Suspense>
        </div>
    );
}
