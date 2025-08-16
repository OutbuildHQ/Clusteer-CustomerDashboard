import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
	const token = request.cookies.get("auth_token")?.value;
	const { pathname } = request.nextUrl;

	if (PUBLIC_FILE.test(pathname)) {
		return NextResponse.next();
	}

	const publicPaths = [
		"/login",
		"/signup",
		"/reset-password",
		"/change-password",
		"/verify-otp",
		"/verify-email",
	];

	if (publicPaths.includes(pathname)) {
		return NextResponse.next();
	}

	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
	],
};
