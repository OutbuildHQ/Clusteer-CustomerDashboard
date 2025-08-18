import apiClient from "@/lib/axios";
import { IOrder, IResponse, ITransaction, IUser, PageParams } from "@/types";
import { AxiosError } from "axios";

export async function getUserInfo() {
	try {
		const res = await apiClient.get<IResponse<IUser>>("/user/profile");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllTransactions(pageParams: PageParams) {
	try {
		const res = await apiClient.get<IResponse<ITransaction[]>>(
			`/transaction/user`,
			{
				params: {
					...pageParams,
				},
			}
		);
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllOrders(pageParams: PageParams) {
	try {
		const res = await apiClient.get<IResponse<IOrder[]>>(`/order`, {
			params: {
				...pageParams,
			},
		});
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
