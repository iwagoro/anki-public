import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
}

// マッチするパスを指定
export const config = {
    matcher: "/",
};
