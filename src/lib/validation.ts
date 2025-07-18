import { z } from "zod";
import { MAXIMUM_VALUE, MINIMUM_VALUE } from "./constants";

export const BuyCryptoSchema = z.object({
	pay: z
		.number()
		.min(
			MINIMUM_VALUE,
			`Amount must be at least NGN ${MINIMUM_VALUE.toLocaleString()}`
		)
		.max(
			MAXIMUM_VALUE,
			`Amount cannot exceed NGN ${MAXIMUM_VALUE.toLocaleString()}`
		),
});

export const SellCryptoSchema = z.object({
	pay: z
		.number()
		.min(
			MINIMUM_VALUE,
			`Amount must be at least NGN ${MINIMUM_VALUE.toLocaleString()}`
		)
		.max(
			MAXIMUM_VALUE,
			`Amount cannot exceed NGN ${MAXIMUM_VALUE.toLocaleString()}`
		),
});

export const PaymentFormSchema = z.object({
	accountNo: z.string(),
	accoutName: z.string(),
	bank: z.string(),
});
