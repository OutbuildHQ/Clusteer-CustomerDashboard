"use client";

import { Toast } from "@/components/toast";
import { resendOTP, verifyOTP } from "@/lib/api/auth";
import { OTPFormSchema } from "@/lib/validation";
import { useUser } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ChevronRight, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ FIXED
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

type VerifyOTPFormData = z.infer<typeof OTPFormSchema>;

export default function VerifyOTPForm() {
	const form = useForm<VerifyOTPFormData>({
		resolver: zodResolver(OTPFormSchema),
		mode: "onChange",
		defaultValues: {
			otp: "",
		},
	});

	const user = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	const buttonRef = useRef<HTMLButtonElement>(null);

	const { isPending: isVerifying, mutate: mutateVerify } = useMutation({
		mutationFn: verifyOTP,
		onSuccess: () => {
			router.push("/");
			Toast.success("OTP verified successfully");
		},
	});

	const { isPending: isResending, mutate: mutateResend } = useMutation({
		mutationFn: resendOTP,
		onSuccess: () => {
			Toast.success("OTP resent successfully");
		},
	});

	const handleAutoSubmit = () => buttonRef.current?.click();

	const onSubmit = (values: VerifyOTPFormData) => {
		if (!user?.username) return;
		const payload = {
			username: user.username,
			...values,
		};
		mutateVerify(payload);
	};

	const handleResend = () => {
		if (!user?.username) return;
		mutateResend({ email: user.email });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 w-full p-5 form-border rounded-2xl"
			>
				<FormField
					control={form.control}
					name="otp"
					render={({ field }) => (
						<FormItem className="gap-2.5">
							<FormDescription className="text-[#344054] font-medium">
								Enter Authentication code
							</FormDescription>
							<FormControl>
								<InputOTP
									autoFocus
									maxLength={6}
									pattern={REGEXP_ONLY_DIGITS}
									onComplete={handleAutoSubmit}
									placeholder="000000"
									{...field}
								>
									<InputOTPGroup className="gap-x-3 justify-between w-full">
										{[0, 1, 2, 3, 4, 5].map((i) => (
											<InputOTPSlot
												key={i}
												className="!rounded-sm border-[#D0D5DD] !border-[1.44px] size-[46px] sm:w-[57px] sm:h-[58px] font-medium text-2xl sm:text-3xl"
												index={i}
											/>
										))}
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					ref={buttonRef}
					type="submit"
					disabled={isVerifying} // ✅ only disable when verifying
					className="font-mona border-black text-[#111111] bg-light-green border font-semibold text-base shadow-xs hover:bg-muted w-full h-11"
				>
					{isVerifying ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Confirming...
						</>
					) : (
						<>Confirm</>
					)}
				</Button>

				<Button
					type="button"
					variant="outline"
					disabled={isResending}
					onClick={handleResend}
					className="w-full h-11"
				>
					{isResending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Resending...
						</>
					) : (
						<>
							<RefreshCw className="mr-2 h-4 w-4" />
							Resend OTP
						</>
					)}
				</Button>

				<Link
					href="/login"
					className="text-center lg:mt-2 mx-auto block"
				>
					<span className="text-dark-green font-semibold">Back to Log in</span>
					<ChevronRight className="inline-block size-5 stroke-dark-green ml-2" />
				</Link>
			</form>
		</Form>
	);
}
