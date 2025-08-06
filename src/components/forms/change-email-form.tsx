"use client";

import { ChangeEmailFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";
import SecurityAlert from "../security-alert";

type ChangeEmailFormData = z.infer<typeof ChangeEmailFormSchema>;

export default function ChangeEmailForm() {
	const form = useForm<ChangeEmailFormData>({
		resolver: zodResolver(ChangeEmailFormSchema),
		mode: "onChange",
		defaultValues: {
			otp: "",
		},
	});

	const [isSuccess, setIsSuccess] = useState(false);

	const onSubmit = (payload: ChangeEmailFormData) => {
		console.log(payload);
		setIsSuccess(true);
	};

	if (isSuccess)
		return (
			<div className="mt-5 lg:mt-[73px] w-fit">
				<p className="font-bold text-2xl">
					Your email address is changed successfully
				</p>

				<Link href="/">
					<Button className="mt-7.5 h-11 font-semibold border-black text-[#111111] bg-light-green border text-base shadow-xs hover:bg-muted w-full">
						Make a transaction
					</Button>
				</Link>
			</div>
		);

	return (
		<div>
			<SecurityAlert content="To ensure the security of your assets, withdrawals and P2P sales are disabled for 24 hours after changing your email address." />
			<Form {...form}>
				<form
					className="space-y-8 mt-8"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="gap-1.5">
								<FormLabel className="font-bold text-black">
									Enter email address
								</FormLabel>
								<FormControl>
									<Input
										className="h-11"
										placeholder="Enter email address"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="otp"
						render={({ field }) => (
							<FormItem className="gap-1.5">
								<FormLabel className="font-bold text-black">
									Email verification code
								</FormLabel>
								<FormControl>
									<div className="relative flex items-center border rounded-lg h-11">
										<Input
											className="h-full border-0 bg-none shadow-none rounded-none w-full"
											placeholder="Enter email verification code"
											maxLength={6}
											{...field}
										/>
										<Button
											variant="outline"
											className="text-dark-green border-0 bg-transparent hover:bg-transparent"
										>
											Send
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="border-black bg-light-green border text-black font-semibold text-base hover:bg-muted w-full h-11"
					>
						Confirm
					</Button>
				</form>
			</Form>
		</div>
	);
}
