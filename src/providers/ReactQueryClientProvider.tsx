"use client";

import { IResponse } from "@/types";
import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useState } from "react";
import { Toast } from "@/components/toast";

type ErrorResponse = IResponse<null> & { errors: string[] };

interface CustomMutationMeta extends Record<string, unknown> {
	skipGlobalErrorHandler?: boolean;
}

declare module "@tanstack/react-query" {
	interface Register {
		defaultError: AxiosError<ErrorResponse>;
		mutationMeta: CustomMutationMeta;
	}
}

export default function ReactQueryClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const handleErrors = async (error: AxiosError<ErrorResponse>) => {
		console.error(error);

		if (!error.response || !error.response.data) {
			Toast.error("Something went wrong");
			return;
		}

		const data = error.response.data;

		Toast.error(data.message);

		// if ("detail" in data) {
		// 	Toast.error(data.detail);
		// } else if ("message" in data) {
		// 	Toast.error(data.message);
		// } else {
		// 	Toast.error("An unexpected error occurred");
		// }
	};

	const [client] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 10 * 60 * 1000,
						gcTime: 60 * 60 * 1000,
					},
				},
				mutationCache: new MutationCache({
					onError: (error, _variables, _context, mutation) => {
						if (mutation.options.meta?.skipGlobalErrorHandler) {
							// Skip global error handling for this mutation
							return;
						}
						handleErrors(error);
					},
				}),
			})
	);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
