import apiClient from "@/lib/axios";
import { Wallet } from "@/store/wallet";
import { IResponse } from "@/types";
import { AxiosError } from "axios";

interface WalletResponse {
	walletAssets: Wallet[];
	pinSet: boolean;
}

export async function getUserWallet() {
	try {
		const res = await apiClient.get<IResponse<WalletResponse>>("/wallet");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
