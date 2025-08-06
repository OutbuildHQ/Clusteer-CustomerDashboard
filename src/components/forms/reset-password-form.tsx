"use client";

import { ResetPasswordFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "../password-input";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { resetPassword } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>;

export default function ResetPasswordForm() {
	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(ResetPasswordFormSchema),
		defaultValues: {
			oldPassword: "",
			newPassword: "",
		},
	});

	const router = useRouter();

	const { isPending, mutate } = useMutation({
		mutationFn: resetPassword,
		onSuccess: () => router.push("/"),
	});

	const onSubmit = (data: ResetPasswordFormData) => {
		mutate(data);
		console.log(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 w-full p-5 form-border rounded-2xl"
			>
				<FormField
					control={form.control}
					name="oldPassword"
					render={({ field }) => (
						<FormItem className="gap-1.5">
							<FormLabel className="font-medium">Old Password</FormLabel>
							<FormControl>
								<PasswordInput {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem className="gap-1.5">
							<FormLabel className="font-medium">New Password</FormLabel>
							<FormControl>
								<PasswordInput {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					disabled={isPending}
					className="font-mona border-black text-[#111111] bg-light-green border font-semibold text-base shadow-xs hover:bg-muted w-full h-11"
				>
					{isPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Resetting...
						</>
					) : (
						<>Reset Passwor</>
					)}
				</Button>

				<Link
					href="/signup"
					className="text-center lg:mt-2 mx-auto block"
				>
					<span className="text-dark-green font-semibold">Back to Log in</span>
					<ChevronRight className="inline-block size-5 stroke-dark-green ml-2" />
				</Link>
			</form>
		</Form>
	);
}
