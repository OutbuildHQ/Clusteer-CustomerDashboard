/* eslint-disable @typescript-eslint/no-explicit-any */

import apiClient from "@/lib/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface ResponseWithToken {
	token: string;
	[key: string]: any;
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const { username, ...payload } = body;

		const { data: otpResponse } = await apiClient.post<ResponseWithToken>(
			`/user/${username}/2fa/validate`,
			payload
		);

		const { token, ...rest } = otpResponse;

		const response = NextResponse.json(rest);

		response.cookies.set("auth_token", token, {
			// httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 3600,
			path: "/",
		});

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
				{ status: 500 }
			);
		}
	}
}
