export type ICrypto = "USDT" | "USDC" | "naira";

export interface ICurrency {
	currency: ICrypto;
	icon: string;
	rate: number;
}

export interface ITransaction {
	id: number;
	user: number;
	username: string;
	type: string;
	title: string;
	ref: string;
	orderNumber: string;
	chain: string | null;
	currency: string;
	amount: number;
	rate: number;
	info: string;
	flow: string;
	description: string;
	status: string;
	dateCreated: string;
}

export interface IResponse<T = null> {
	status: boolean;
	message: string;
	data: T;
}

export interface IUser {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	dob: string;
	gender: string;
	phone: string;
	avatar: string;
	occupation: string;
	emailVerified: boolean;
	kyc: {
		id: number;
		identity: string;
		idType: string;
		idNumber: string;
		idExpiry: string;
		status: string;
		idVerified: boolean;
	};
	address: {
		id: number;
		country: string;
		state: string;
		city: string;
		zip: string;
		address: string;
		status: string;
		utility: string;
		addressVerified: boolean;
	};
	dateJoined: string;
	type: string;
	active: boolean;
}

export type Auth2FARequest = {
	twoFactorSecret: string;
	twoFactorQR: string;
};
