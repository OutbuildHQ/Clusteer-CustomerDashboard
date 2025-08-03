import apiClient from "@/lib/axios";
import { IResponse, ITransaction, IUser } from "@/types";
import { AxiosError } from "axios";

export async function getUserInfo() {
	try {
		const res = await apiClient.get<IResponse<IUser>>("/user/profile");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllTransactions({
	page,
	size,
}: {
	page: number;
	size: number;
}) {
	try {
		const res = await apiClient.get<IResponse<ITransaction[]>>(
			`/transaction/user`,
			{
				params: {
					page,
					size,
				},
			}
		);
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
