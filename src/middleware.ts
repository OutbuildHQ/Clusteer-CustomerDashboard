// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("auth_token")?.value;
	const { pathname } = request.nextUrl;

	// Define routes that don't require authentication
	const publicPaths = ["/login", "/signup"];

	// If the request is for a public path, allow it
	if (publicPaths.includes(pathname)) {
		return NextResponse.next();
	}

	// If the token is not present, redirect to the login page
	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// If the token is present, allow the request
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!login|signup|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
