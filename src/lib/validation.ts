import { z } from "zod";
import {
	ALLOWED_IMAGE_FILES,
	MAX_IMAGE_SIZE,
	MAXIMUM_VALUE,
	MINIMUM_VALUE,
} from "./constants";

export const LoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});


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

const IMAGE_SCHEMA = z
	.instanceof(File)
	.refine((file) => ALLOWED_IMAGE_FILES.includes(file.type), {
		message: "Invalid image file type",
	})
	.refine((file) => file.size <= MAX_IMAGE_SIZE, {
		message: "File size should not exceed 5MB",
	});

export const UpdateProfileFormSchema = z.object({
	displayName: z.string(),
	username: z.string(),
	email: z.string().email(),
	profileImage: IMAGE_SCHEMA,
	phoneNo: z.string(),
});

export const IdentityVerficationFormSchema = z.object({
	residency: z.string(),
});
