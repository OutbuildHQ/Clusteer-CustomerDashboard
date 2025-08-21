import apiClient from "@/lib/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface ResponseWithToken {
	token: string;
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const { data: loginResponse } = await apiClient.post<ResponseWithToken>(
			"/user/login",
			body
		);

		const { token } = loginResponse;

		const response = NextResponse.json(loginResponse);

		if (token) {
			// Set access token as an HttpOnly cookie
			response.cookies.set("auth_token", token, {
				// httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: process.env.NODE_ENV === "production" ? 3600 : 10800, // One hour on Prod, 3 hours on dev
				path: "/",
			});
		}
		return response;
	} catch (error) {
		if (error instanceof AxiosError) {
			return NextResponse.json(error.response?.data || error.message, {
				status: error.response?.status || 500,
			});
		} else {
			return NextResponse.json(
				{
					status: false,
					message: "An unexpected error occurred",
				},
				{
					status: 500,
				}
			);
		}
	}
}
