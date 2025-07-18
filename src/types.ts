export type ICrypto = "USDT" | "USDC";

export interface ICurrency {
	currency: ICrypto;
	icon: string;
	rate: number;
}

export interface ITransaction {
	type: "buy" | "sell";
	time: string;
	amountPaid: number;
	price: number;
	crypto: ICrypto;
	amount: number;
	fee: number;
	orderNo: string;
	status: "completed" | "pending" | "failed";
	actionText?: string;
}
