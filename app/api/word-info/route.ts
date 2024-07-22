import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const baseUrl = process.env.DICTIONONARY_LINK;
    const { searchParams } = new URL(request.url);
    const word = searchParams.get("word");

    if (!word) {
        return NextResponse.json({ error: "No word provided" }, { status: 400 });
    }

    if (!baseUrl) {
        return NextResponse.json({ error: "Dictionary link not set" }, { status: 500 });
    }

    const url = `${baseUrl}/${word}`;

    try {
        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error: any) {
        console.error("Error fetching data from Oxford API:", error.response?.data || error.message);
        return NextResponse.json({ error: "Failed to fetch word info", details: error.response?.data || error.message }, { status: error.response?.status || 500 });
    }
}
