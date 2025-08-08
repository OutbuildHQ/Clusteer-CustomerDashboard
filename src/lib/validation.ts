import { z } from "zod";
import {
	ALLOWED_IMAGE_FILES,
	MAX_IMAGE_SIZE,
	MAXIMUM_VALUE,
	MINIMUM_VALUE,
} from "./constants";

export const LoginFormSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export const SignupFormSchema = z.object({
	// firstName: z.string().min(3, { message: "Minimum 3 letters" }),
	// lastName: z.string().min(3, { message: "Minimum 3 letters" }),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" })
		.regex(/^[a-zA-Z][a-zA-Z0-9_]+$/, {
			message:
				"Username must start with a letter and contain only letters, numbers, and underscores",
		}),
	email: z.string().email({ message: "Invalid Email" }),
	phone: z
		.string()
		.regex(/^((^0)(7|8|9)(0|1)[0-9]{8})$/, "Invalid phone number format"),
	password: z.string().min(1, { message: "Password is required" }),
	// gender: z.enum(["male", "female", "other"], {
	// 	required_error: "Gender is required",
	// 	invalid_type_error: "Invalid gender option",
	// }),
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IMAGE_SCHEMA = z
	.instanceof(File)
	.refine((file) => ALLOWED_IMAGE_FILES.includes(file.type), {
		message: "Invalid image file type",
	})
	.refine((file) => file.size <= MAX_IMAGE_SIZE, {
		message: "File size should not exceed 5MB",
	});

export const UpdateProfileFormSchema = z.object({
	displayName: z
		.string()
		.min(2, "Display name must be at least 2 characters")
		.max(50, "Display name must be at most 50 characters"),
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be at most 20 characters")
		.regex(
			/^[a-zA-Z0-9_]+$/,
			"Username can only contain letters, numbers, and underscores"
		),
	email: z.string().email("Please enter a valid email address"),
	phoneNo: z
		.string()
		.length(11, "Phone number must be at must be 11 digits")
		.regex(/^[0-9+\-() ]+$/, "Invalid phone number format"),
	// profileImage: IMAGE_SCHEMA,
});

export const IdentityVerficationFormSchema = z.object({
	residency: z.string(),
});

export const GoogleOTPFormSchema = z.object({
	otp: z.string().regex(/^\d{6}$/, {
		message: "Code must be exactly 6 digits",
	}),
});

export const ChangeEmailFormSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	otp: z.string().regex(/^\d{6}$/, {
		message: "Code must be exactly 6 digits",
	}),
});

export const ForgotPasswordFormSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

export const ResetPasswordFormSchema = z.object({
	oldPassword: z.string().min(1, { message: "Password is required" }),
	newPassword: z.string().min(1, { message: "Password is required" }),
	// confirmPassword: z
	// 	.string()
	// 	.min(1, { message: "Confirm Password is required" }),
});
// .refine((data) => data.newPassword === data.confirmPassword, {
// 	message: "Passwords do not match",
// 	path: ["confirmPassword"], // show error on confirmPassword field
// });

export const ChangePasswordFormSchema = z
	.object({
		newPassword: z.string().min(1, { message: "Password is required" }),
		confirmPassword: z
			.string()
			.min(1, { message: "Confirm Password is required" }),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // show error on confirmPassword field
	});
